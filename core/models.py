from django.db import models


def default_file():
    return 'default_files/default.pdf'


class UploadedNotes(models.Model):
    title = models.CharField(max_length=60)
    content = models.FileField(upload_to='store/pdfs/', default=default_file)

    def __str__(self):
        return self.title
