from django.urls import path
from .views import RegisterView, LoginView, MeView
from .views import (
    PostListCreateView, PostDetailView,
    CommentListCreateView, LikeToggleView,
    PostSearchView
)

urlpatterns = [
    # 認証
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/me/", MeView.as_view(), name="me"),

    # 投稿
    path("posts/", PostListCreateView.as_view(), name="post-list"),
    path("posts/<int:pk>/", PostDetailView.as_view(), name="post-detail"),

    # コメント
    path("posts/<int:pk>/comments/", CommentListCreateView.as_view(), name="comment-list"),

    # いいね
    path("posts/<int:pk>/like/", LikeToggleView.as_view(), name="like-toggle"),

    # 検索
    path("posts/search/", PostSearchView.as_view(), name="post-search"),
]
