from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer

from rest_framework.views import APIView
from django.db.models import Q
from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer, LikeSerializer

User = get_user_model()

# ユーザー登録
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# ログイン (JWT発行)
class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

# 自分のプロフィール
class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# 投稿一覧 & 作成
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# 投稿詳細
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        if self.get_object().user != self.request.user:
            raise PermissionError("You do not have permission to edit this post.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionError("You do not have permission to delete this post.")
        instance.delete()

# コメント一覧 & 作成
class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(post_id=self.kwargs["pk"]).order_by("created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, post_id=self.kwargs["pk"])

# いいね
class LikeToggleView(generics.GenericAPIView):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = Post.objects.get(pk=pk)
        like, created = Like.objects.get_or_create(post=post, user=request.user)
        serializer = self.get_serializer(like)
        if not created:
            like.delete()
            return Response({"message": "Like removed", "like": serializer.data})
        return Response({"message": "Liked", "like": serializer.data})

# 検索
class PostSearchView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        q = self.request.query_params.get("q", "")
        return Post.objects.filter(Q(content__icontains=q) | Q(user__username__icontains=q))
