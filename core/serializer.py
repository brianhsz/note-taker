from rest_framework import serializers
from .models import UploadedNotes


class UploadedNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedNotes
        fields = ('id', 'title')