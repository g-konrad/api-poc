package routes

import (
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func RenderTemplateUploadFiles(ctx *gin.Context) {
	ctx.HTML(200, "upload.tmpl", gin.H{})
}

func UploadFiles(ctx *gin.Context) {
	form, _ := ctx.MultipartForm()
	files := form.File["file"]

	filenames := make([]string, len(files))

	for _, file := range files {
		filename := "./tmp/" + filepath.Base(file.Filename)

		filenames = append(filenames, filename)

		if err := ctx.SaveUploadedFile(file, filename); err != nil {
			ctx.HTML(400, "upload_error.tmpl", gin.H{
				"error": err.Error(),
			})
		}
	}

	ctx.HTML(200, "upload_success.tmpl", gin.H{
		"filenames": filenames,
	})
}
