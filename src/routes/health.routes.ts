import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import Redis from 'ioredis';

const router = Router();

// Basic health check
router.get('/health', async (_req: Request, res: Response) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  };

  res.status(200).json(health);
});

// Detailed health check with dependencies
router.get('/health/detailed', async (_req: Request, res: Response) => {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      memory: checkMemory(),
      disk: checkDisk(),
    },
  };

  const allHealthy = Object.values(checks.checks).every((check: any) => check.status === 'healthy');
  const statusCode = allHealthy ? 200 : 503;

  res.status(statusCode).json(checks);
});

// Readiness probe (for Kubernetes)
router.get('/health/ready', async (_req: Request, res: Response) => {
  try {
    // Check critical dependencies
    const dbCheck = await checkDatabase();
    const redisCheck = await checkRedis();

    if (dbCheck.status === 'healthy' && redisCheck.status === 'healthy') {
      res.status(200).json({ status: 'ready' });
    } else {
      res.status(503).json({ 
        status: 'not ready',
        database: dbCheck.status,
        redis: redisCheck.status
      });
    }
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: 'Health check failed' });
  }
});

// Liveness probe (for Kubernetes)
router.get('/health/live', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'alive' });
});

// Metrics endpoint (Prometheus format)
router.get('/metrics', async (_req: Request, res: Response) => {
  const metrics = `
# HELP wallie_backend_up Backend service up status
# TYPE wallie_backend_up gauge
wallie_backend_up 1

# HELP wallie_backend_uptime_seconds Backend service uptime in seconds
# TYPE wallie_backend_uptime_seconds counter
wallie_backend_uptime_seconds ${process.uptime()}

# HELP wallie_backend_memory_usage_bytes Memory usage in bytes
# TYPE wallie_backend_memory_usage_bytes gauge
wallie_backend_memory_usage_bytes{type="rss"} ${process.memoryUsage().rss}
wallie_backend_memory_usage_bytes{type="heap_total"} ${process.memoryUsage().heapTotal}
wallie_backend_memory_usage_bytes{type="heap_used"} ${process.memoryUsage().heapUsed}
wallie_backend_memory_usage_bytes{type="external"} ${process.memoryUsage().external}

# HELP wallie_backend_cpu_usage_percent CPU usage percentage
# TYPE wallie_backend_cpu_usage_percent gauge
wallie_backend_cpu_usage_percent ${process.cpuUsage().user / 1000000}

# HELP nodejs_version_info Node.js version info
# TYPE nodejs_version_info gauge
nodejs_version_info{version="${process.version}"} 1
`;

  res.set('Content-Type', 'text/plain; version=0.0.4');
  res.send(metrics.trim());
});

// Helper functions
async function checkDatabase(): Promise<{ status: string; latency?: number; error?: string }> {
  try {
    const start = Date.now();
    const connection = getConnection();
    await connection.query('SELECT 1');
    const latency = Date.now() - start;
    return { status: 'healthy', latency };
  } catch (error) {
    return { status: 'unhealthy', error: (error as Error).message };
  }
}

async function checkRedis(): Promise<{ status: string; latency?: number; error?: string }> {
  try {
    const redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      lazyConnect: true,
    });
    
    const start = Date.now();
    await redis.ping();
    const latency = Date.now() - start;
    await redis.quit();
    
    return { status: 'healthy', latency };
  } catch (error) {
    return { status: 'unhealthy', error: (error as Error).message };
  }
}

function checkMemory(): { status: string; usage: number; limit: number } {
  const usage = process.memoryUsage();
  const usagePercent = (usage.heapUsed / usage.heapTotal) * 100;
  
  return {
    status: usagePercent > 90 ? 'warning' : 'healthy',
    usage: Math.round(usagePercent),
    limit: 90,
  };
}

function checkDisk(): { status: string } {
  // In a real app, you'd check actual disk usage
  return { status: 'healthy' };
}

export default router;
