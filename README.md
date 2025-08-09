# MERN Stack Todo List Uygulaması

Bu proje, kullanıcı kaydı ve girişi özelliklerine sahip, görev (todo) ekleme, silme ve tamamlama işlevselliği sunan tam teşekküllü bir web uygulamasıdır. Proje, MERN (MongoDB, Express.js, React, Node.js) yığını kullanılarak geliştirilmiştir.

## Özellikler

-   **Kullanıcı Yönetimi:**
    -   Yeni kullanıcı kaydı
    -   Kullanıcı girişi
    -   JWT (JSON Web Token) ile güvenli session yönetimi
-   **Görev (Todo) Yönetimi:**
    -   Giriş yapmış kullanıcıya özel görev listesi
    -   Yeni görev ekleme
    -   Mevcut görevleri silme
    -   Görevleri "tamamlandı" olarak işaretleme/işaretini kaldırma
-   **Frontend:**
    -   React ile geliştirilmiş modern ve reaktif kullanıcı arayüzü
    -   React Router ile sayfa yönlendirmesi
    -   Material-UI ile şık ve kullanışlı tasarım bileşenleri
    -   Axios ile API istekleri
-   **Backend:**
    -   Node.js ve Express.js ile oluşturulmuş RESTful API
    -   MongoDB ve Mongoose ile esnek veritabanı yönetimi
    -   CORS desteği

## Kullanılan Teknolojiler

-   **Frontend:**
    -   React
    -   React Router
    -   Axios
    -   Material-UI (@mui/material)
-   **Backend:**
    -   Node.js
    -   Express.js
    -   MongoDB (Mongoose)
    -   JSON Web Token (jsonwebtoken)

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/Quiaa/todo-app.git
cd todo-app
```

### 2. Backend Kurulumu

Sunucu tarafı bağımlılıklarını kurun ve ortam değişkenlerini ayarlayın.

```bash
# Proje kök dizinindeyken
cd server
npm install
```

#### Ortam Değişkenleri

`server` dizininde `.env` adında bir dosya oluşturun ve aşağıdaki değişkenleri kendi MongoDB bağlantı bilgilerinizle doldurun:

```
PORT=5000
MONGO_URI=mongodb+srv://<kullanici_adi>:<sifre>@<cluster-adresi>/<veritabani_adi>?retryWrites=true&w=majority
JWT_SECRET=gizli_anahtar_buraya_gelecek
```

-   `MONGO_URI`: MongoDB Atlas veya yerel MongoDB bağlantı cümleniz.
-   `JWT_SECRET`: Token imzalamak için kullanılacak gizli bir anahtar.

### 3. Frontend Kurulumu

İstemci tarafı bağımlılıklarını kurun.

```bash
# Proje kök dizinindeyken
cd client
npm install
```

### 4. Uygulamayı Çalıştırma

#### Backend Sunucusunu Başlatma

```bash
# /server dizinindeyken
npm start
```

Sunucu varsayılan olarak `http://localhost:5000` adresinde çalışacaktır.

#### Frontend Uygulamasını Başlatma

```bash
# /client dizinindeyken
npm start
```

React geliştirme sunucusu varsayılan olarak `http://localhost:3000` adresinde başlayacak ve uygulamayı tarayıcınızda açacaktır.

## API Endpointleri

Tüm `/todos` endpoint'leri JWT token ile koruma altındadır ve `Authorization` başlığında `Bearer <token>` formatında bir token gerektirir.

-   `POST /api/users/register`: Yeni bir kullanıcı oluşturur.
-   `POST /api/users/login`: Kullanıcı girişi yapar ve bir JWT token döndürür.
-   `GET /todos`: Giriş yapmış kullanıcının tüm görevlerini listeler.
-   `POST /todos/add`: Yeni bir görev ekler.
-   `DELETE /todos/:id`: Belirtilen ID'ye sahip görevi siler.
-   `POST /todos/update/:id`: Belirtilen ID'ye sahip görevin "tamamlandı" durumunu değiştirir.
