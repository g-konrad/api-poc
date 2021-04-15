use actix_web::web;

use super::routes::{ping, websocket};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/ping", web::get().to(ping::index))
        .route("/ws/", web::get().to(websocket::index));
}
