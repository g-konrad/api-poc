use env_logger::{Builder, Env};
use warp::Filter;

#[tokio::main]
async fn main() {
    Builder::from_env(Env::default().default_filter_or("info")).init();

    let num_cpus = num_cpus::get();
    let workers = (num_cpus * 2) + 1;
    println!("Running {} workers", workers);

    let ping = warp::path("ping").map(|| "pong");
    warp::serve(ping).run(([127, 0, 0, 1], 8080)).await;
}
