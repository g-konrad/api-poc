use actix_multipart::Multipart;
use actix_web::{web, HttpResponse, Responder};
use futures::{StreamExt, TryStreamExt};
use std::io::Write;

pub async fn index() -> impl Responder {
    // HTML simples pra podermos fazer upload
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(
            r#"<html>
        <head><title>Upload Test</title></head>
        <body>
            <form target="/" method="post" enctype="multipart/form-data">
                <input type="file" multiple name="file"/>
                <button type="submit">Submit</button>
            </form>
        </body>
    </html>"#,
        )
}

pub async fn upload_file(mut payload: Multipart) -> impl Responder {
    // Multipart é um stream de Fields (que são streams de bytes).
    // Com `while let` nós capturamos os fields que chegam, de maneira assíncrona.
    let mut filenames = vec![];
    while let Ok(Some(mut field)) = payload.try_next().await {
        let content_type = field.content_disposition().unwrap();
        let filename = content_type.get_filename().unwrap();
        let sanitized = sanitize_filename::sanitize(&filename);
        let filepath = format!("./tmp/{}", sanitized);

        filenames.push(sanitized);

        // Depois de criar um nome sanitizado para o arquivo, criamos o arquivo em si no diretório
        // <project_root>/tmp, de maneira assíncrona.
        let mut f = web::block(|| std::fs::File::create(filepath))
            .await
            .unwrap();

        // Lemos o Field (que é um stream de bytes) e escrevemos ao arquivo que foi criado, também de maneira assíncrona.
        while let Some(chunk) = field.next().await {
            let data = chunk.unwrap();
            f = web::block(move || f.write_all(&data).map(|_| f))
                .await
                .unwrap();
        }
    }

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(filenames.join(", "))
}
