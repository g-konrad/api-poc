use actix_web::web;

use crate::routes::{file_upload, ping, websocket};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/ping", web::get().to(ping::index))
        .route("/ws/", web::get().to(websocket::index))
        .service(
            web::resource("/upload-files/")
                .route(web::get().to(file_upload::index))
                .route(web::post().to(file_upload::upload_file)),
        );
}
