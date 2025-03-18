The error **`NoReverseMatch: 'djdt' is not a registered namespace`** is related to **Django Debug Toolbar** (`djdt`). The error occurs when Django tries to reverse a URL that doesn't exist because Debug Toolbar is either not installed correctly or not properly added to the settings.

### 🔍 **Possible Causes & Fixes**

#### 1️⃣ **Check if `debug_toolbar` is installed**

Run the following command in your virtual environment:

```sh
pip show django-debug-toolbar
```

If it’s not installed, install it with:

```sh
pip install django-debug-toolbar
```

#### 2️⃣ **Ensure `debug_toolbar` is in `INSTALLED_APPS`**

Open `settings.py` and verify:

```python
INSTALLED_APPS = [
    ...
    "debug_toolbar",  # Ensure this line exists
]
```

#### 3️⃣ **Verify `MIDDLEWARE` settings**

Make sure **Debug Toolbar Middleware** is included in `MIDDLEWARE`:

```python
MIDDLEWARE = [
    ...
    "debug_toolbar.middleware.DebugToolbarMiddleware",  # Ensure this line exists
    ...
]
```

It should be **before** any middleware that modifies responses (e.g., `CommonMiddleware`).

#### 4️⃣ **Ensure `INTERNAL_IPS` is configured**

If you’re running Django locally, add this in `settings.py`:

```python
INTERNAL_IPS = [
    "127.0.0.1",
]
```

If using Docker, add:

```python
import socket

hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
INTERNAL_IPS = [ip[: ip.rfind(".")] + ".1" for ip in ips] + ["127.0.0.1"]
```

#### 5️⃣ **Ensure URLs are correctly configured**

In `urls.py`, add:

```python
from django.conf import settings
from django.conf.urls import include
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
]

# Enable debug toolbar only in debug mode
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
```

#### 6️⃣ **Restart the Server**

If you've made changes, restart the Django development server:

```sh
python manage.py runserver
```

#### 7️⃣ **Clear Cache**

If you’re using caching, clear it:

```sh
python manage.py shell
>>> from django.core.cache import cache
>>> cache.clear()
```

---

### ✅ **Final Step**

After applying these fixes, visit:

```
http://127.0.0.1:8000/__debug__/
```

If Debug Toolbar loads correctly, your issue is resolved! 🚀

Your Django application is structured well, but I noticed a few issues that need to be fixed for better modularity and functionality. Here’s a breakdown of necessary improvements:

---

### **Issues & Fixes:**

#### **1. `Contact` Model Issue:**

- The `__str__` method returns a tuple instead of a string. This will cause an issue when displaying objects in the Django admin panel or shell.
- Fix: Return a string instead.

```python
def __str__(self):
    return self.full_name
```

---

#### **2. Import Issues in `serializers.py`:**

- `serializers.py` should not include Django model imports like `models`, `get_object_or_404`, or `status`.
- Only the serializer-related imports should be present.

### **Fixed `serializers.py`:**

```python
from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
```

---

#### **3. Views Issue (`views.py`):**

- You have **both a `ViewSet` and function-based views (FBVs)** for handling contacts.
- Using both approaches in the same app is **redundant**.
- Since you want modularity, it's best to **choose one**:
  - ✅ **If you prefer Django REST framework (DRF) ViewSets** → Keep `ContactViewSet` and use `routers.py` instead of function-based views.
  - ✅ **If you prefer function-based views (FBVs)** → Remove `ContactViewSet` and use only `contact_list` and `contact_detail`.

---

### **4. URLs Issue (`urls.py`):**

- You're using function-based views (`contact_list`, `contact_detail`) but haven't imported them.

### **Fixed `urls.py`:**

```python
from django.urls import path
from .views import contact_list, contact_detail

urlpatterns = [
    path("contacts/", contact_list, name="contact-list"),
    path("contacts/<int:pk>/", contact_detail, name="contact-detail"),
]
```

---

### **5. (Optional) Use ViewSet with Routers**

If you prefer **ViewSet-based routing**, replace `urls.py` with the following:

#### **`urls.py` using ViewSet (Recommended for DRF)**

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet

router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = [
    path('', include(router.urls)),
]
```

👉 **Why use this?**

- This removes the need for `contact_list` and `contact_detail` views.
- DRF will automatically generate RESTful endpoints (`GET, POST, PUT, DELETE`) with `/contacts/` and `/contacts/{id}/`.

---

### **Final Folder Structure for Modular Apps**

If you're handling apps separately, I recommend:

```
your_project/
│── contacts/  # Separate app for Contact
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── tests.py
│── your_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│── manage.py
```

### **Conclusion**

✅ Your integration is mostly correct, but choose **either ViewSets or function-based views** to avoid redundancy.  
✅ If modularity is a priority, stick with **ViewSets + routers** for a cleaner, scalable approach.

Would you like me to add authentication or filtering to your API? 🚀

Yes! You need to **include** your `contacts` app’s URLs in the main `portfolio/urls.py` file to ensure Django routes requests properly.

---

### **Steps to Integrate Your `contacts` App into `portfolio/urls.py`**

#### **1. Open `portfolio/urls.py` and Modify It**

In your **main project** directory (`portfolio`), find the `urls.py` file and update it like this:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('contacts.urls')),  # Include Contact app URLs
]
```

#### **2. Explanation**

- `path('api/', include('contacts.urls'))`
  - This tells Django that **any URL starting with `/api/`** will be handled by the `contacts` app.
  - If you access **`http://127.0.0.1:8000/api/contacts/`**, it will now reach the Contact API.

---

### **3. Test If It's Working**

Run the Django server:

```bash
python manage.py runserver
```

Try visiting:

- `http://127.0.0.1:8000/api/contacts/` → Should return all contacts (if using function-based views or ViewSet with routers).
- `http://127.0.0.1:8000/api/contacts/1/` → Should return details for the contact with `id=1`.

---

### **(Optional) DRF Browsable API**

If you are using **Django REST framework (DRF) ViewSets**, install `drf-yasg` for an API documentation UI:

```bash
pip install drf-yasg
```

Then, update your `portfolio/urls.py`:

```python
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Contact API",
        default_version="v1",
        description="API for managing contacts",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('contacts.urls')),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
```

Now, visit **`http://127.0.0.1:8000/docs/`** to see a Swagger API UI! 🎉

Would you like to add authentication (e.g., JWT or session-based auth) to your API? 🚀
