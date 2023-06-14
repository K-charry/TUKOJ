from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/problems/", include("problems.urls")),
    path("api/v1/solutions/", include("solutions.urls")),
    path("api/v1/qna/", include("qna.urls")),
]
