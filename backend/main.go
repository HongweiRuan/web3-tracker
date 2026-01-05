package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-resty/resty/v2"
)

func main() {
	// Get Alchemy URL from environment variable
	alchemyURL := os.Getenv("ALCHEMY_URL")
	if alchemyURL == "" {
		log.Fatal("ALCHEMY_URL environment variable is not set")
	}

	r := gin.Default()
	client := resty.New()

	// Enable CORS, otherwise frontend cannot connect
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Next()
	})

	r.GET("/api/balance/:address", func(c *gin.Context) {
		address := c.Param("address")

		// Call Ethereum standard eth_getBalance method
		resp, err := client.R().
			SetHeader("Content-Type", "application/json").
			SetBody(map[string]interface{}{
				"jsonrpc": "2.0",
				"id":      1,
				"method":  "eth_getBalance",
				"params":  []string{address, "latest"},
			}).
			Post(alchemyURL)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to Ethereum node"})
			return
		}

		fmt.Println("Alchemy Response:", resp.String()) // Print log for debugging
		c.Data(http.StatusOK, "application/json", resp.Body())
	})

	fmt.Println("🚀 Backend service started: http://localhost:8080")
	r.Run(":8080")
}