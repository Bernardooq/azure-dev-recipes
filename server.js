const app = require('./app');
const port = process.env.PORT || 3005;

const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

// Inicializa Sentry
Sentry.init({
  dsn: "https://5acd59b877f13bd483fb338b77218e65@o4510297418629120.ingest.us.sentry.io/4510297475252224",
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: "trace",
  enableLogs: true,
  sendDefaultPii: true,
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Sentry conectado correctamente. Ve a /debug-sentry para probar un error.");
});

// Ruta para generar un error y enviarlo a Sentry
app.get("/debug-sentry", (req, res) => {
  Sentry.captureMessage("Usuario accedió a /debug-sentry — generando error de prueba.");
  throw new Error("Error de prueba enviado a Sentry!");
});

// Middleware de manejo de errores de Sentry
Sentry.setupExpressErrorHandler(app);

// Middleware de error personalizado
app.use((err, req, res, next) => {
  console.error("Error capturado:", err.message);
  res.status(500).send("Error capturado por Sentry: " + res.sentry);
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log("Running in port " + port);
  });
}


