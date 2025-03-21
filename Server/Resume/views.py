from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Resume
from .serializers import ResumeSerializer


@api_view(["GET"])
def get_resume(request):
    try:
        resume = Resume.objects.first()  # Fetch the first resume entry
        if not resume:
            return Response({"error": "No resume found"}, status=404)

        serializer = ResumeSerializer(resume)  # Serialize the resume data
        return Response(serializer.data)  # Return serialized data as JSON
    except Exception as e:
        return Response({"error": str(e)}, status=500)
