from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import UploadedNoteSerializer
from .models import UploadedNotes


# front page
def front(request):
    context = {}
    return render(request, 'index.html', context)


# getting and posting notes
@api_view(['GET', 'POST'])
def up_note(request):

    if request.method == 'GET':
        note = UploadedNotes.objects.all()
        serializer = UploadedNoteSerializer(note, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UploadedNoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# deleting notes
@api_view(['DELETE'])
def note_detail(request, pk):
    try:
        note = UploadedNotes.objects.get(pk=pk)
    except UploadedNotes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)