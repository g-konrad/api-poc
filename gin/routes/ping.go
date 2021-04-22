package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PingGet(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}
