package general

import "github.com/gin-gonic/gin"

func RouterGroup(r *gin.RouterGroup) {
	authRouter := r.Group("/auth")
	AuthRouterGroup(authRouter)

	assetRouter := r.Group("/asset")
	AssetRouterGroup(assetRouter)

	sellRouter := r.Group("/sell")
	SellRouterGroup(sellRouter)
}
