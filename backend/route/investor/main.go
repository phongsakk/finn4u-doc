package investor

import "github.com/gin-gonic/gin"

func RouterGroup(r *gin.RouterGroup) {
	auth1 := r.Group("")
	AuthRouterGroup(auth1)
	auth2 := r.Group("/auth")
	AuthRouterGroup(auth2)
	bid := r.Group("/bid")
	BidRouterGroup(bid)
	matching := r.Group("/matching")
	MatchingRouterGroup(matching)
}
