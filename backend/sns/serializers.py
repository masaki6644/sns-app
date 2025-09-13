from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Comment, Like

User = get_user_model()

#　新規登録
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user
#　既存ユーザー
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


# 投稿
class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source="user.username")
    likes_count = serializers.IntegerField(source="likes.count", read_only=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)

    class Meta:
        model = Post
        fields = ("id", "user", "author_username", "content", "created_at", "updated_at", "likes_count", "comments_count")
        read_only_fields = ("id", "user", "author_username", "created_at", "updated_at", "likes_count", "comments_count")

# コメント
class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Comment
        fields = ("id", "post", "user", "author_username", "content", "created_at")
        read_only_fields = ("id", "user", "author_username", "created_at")

# いいね
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ("id", "post", "user", "created_at")
        read_only_fields = ("id", "user", "created_at")