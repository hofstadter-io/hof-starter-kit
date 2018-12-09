import "dotenv/config";
import log from "../../common/log";
import "./server";

console.log("XXX HOF ENV", process.env.HOF_CLIENT_COMPONENT, process.env.HOF_SERVER_COMPONENT)

process.on("uncaughtException", ex => {
    log.error(ex);
    process.exit(1);
});

process.on("unhandledRejection", reason => {
    console.log("GOT HERE");
    log.error(reason);
});

if (module.hot) {
    module.hot.status(event => {
        if (event === "abort" || event === "fail") {
            log("HMR error status: " + event);
            // Signal webpack.run.js to do full-reload of the back-end
            process.exit(250);
        }
    });

    module.hot.accept();
}
