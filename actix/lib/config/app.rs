use crate::routes::{file_upload, ping};
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    // Configuramos aqui nossas rotas pra manter modularidade.
    // Esse ServiceConfig eventualmente vai ser registrado no App em si.
    cfg.route("/ping", web::get().to(ping::index)).service(
        web::resource("/upload-files/")
            .route(web::get().to(file_upload::index))
            .route(web::post().to(file_upload::upload_file)),
    );
}
