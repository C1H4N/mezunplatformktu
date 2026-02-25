export const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
].sort((a, b) => a.localeCompare(b, 'tr'));

export const departmentGroups = {
    "ARAKLI ALİ CEVAT ÖZYURT MESLEK YÜKSEKOKULU": [
        "Mülkiyet Koruma ve Güvenlik Bölümü",
        "Yönetim ve Organizasyon Bölümü",
        "Elektronik ve Otomasyon Bölümü",
        "Bilgisayar Teknolojileri Bölümü",
    ]
};

export const jobFields = [
    "Yazılım Geliştirme",
    "Veri Bilimi",
    "Proje Yönetimi",
    "Finansal Analiz",
    "İnsan Kaynakları",
    "Pazarlama",
    "Satış",
    "Eğitim",
    "Sağlık",
    "Hukuk",
    "Mühendislik",
    "Danışmanlık",
    "Tasarım",
    "Ar-Ge",
    "Üretim",
    "Medya ve İletişim",
].sort((a, b) => a.localeCompare(b, 'tr'));

export const flatDepartments = Object.values(departmentGroups).flat().sort((a, b) => a.localeCompare(b, 'tr'));
