use actix_web::{middleware::Logger, App, HttpServer};
use env_logger::{Builder, Env};

use lib::config;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    Builder::from_env(Env::default().default_filter_or("info")).init();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .configure(config::config)
    })
    .bind("0.0.0.0:8080")?
    .workers(16)
    .run()
    .await
}
