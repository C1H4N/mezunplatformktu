KTÜ Mezun Platformu - Yazılım Gereksinim Analizi

Proje Adı: KTÜ Mezun Platformu

Versiyon: 2.0

Tarih: 21 Aralık 2025

# 1\. GİRİŞ

**1.1 Doküman Amacı**

Bu dokümanın amacı, bir üniversiteye ait mezun platformu için geliştirilecek web tabanlı yazılım sisteminin gereksinimlerini ayrıntılı ve açık bir şekilde tanımlamaktır. Yazılım Gereksinim Analizi (Software Requirements Specification - SRS) dokümanı; sistemin fonksiyonel ve fonksiyonel olmayan gereksinimlerini, kullanıcı rollerini, kısıtlarını ve kabul kriterlerini ortaya koyarak yazılım geliştirme sürecine rehberlik etmeyi amaçlamaktadır.

Bu doküman; yazılım geliştiriciler, proje yöneticileri, sistem yöneticileri, test uzmanları ve ilgili paydaşlar tarafından referans doküman olarak kullanılacaktır.

**1.2 Kapsam**

Geliştirilecek mezun platformu, üniversite mezunları, aktif öğrenciler, işverenler ve üniversite yönetimi arasında dijital bir etkileşim ve iletişim ortamı sunmayı hedeflemektedir.

Sistem kapsamında aşağıdaki temel işlevler yer almaktadır:

- Kullanıcı kayıt, giriş ve kimlik doğrulama işlemleri
- Mezun, öğrenci ve işveren profillerinin oluşturulması ve yönetilmesi
- İş ve staj ilanlarının yayınlanması ve başvuru süreçlerinin yönetilmesi
- Üniversite tarafından veya mezunlar tarafından düzenlenen etkinliklerin duyurulması
- Kullanıcılar arası mesajlaşma ve networking özellikleri
- Yönetici (admin) paneli üzerinden içerik, kullanıcı ve sistem yönetimi
- Bildirim mekanizmaları
- Güvenlik, yetkilendirme ve veri gizliliği kontrolleri

Bu proje, üniversitenin mezun-öğrenci-iş dünyası ilişkilerini güçlendirmeyi ve sürdürülebilir bir mezun ağı oluşturmayı amaçlamaktadır.

**1.3 Tanımlar, Kısaltmalar ve Terimler**

| **Terim / Kısaltma** | **Açıklama** |
| --- | --- |
| Mezun | Üniversiteden mezun olmuş, sisteme kayıtlı kullanıcı |
| Öğrenci | Üniversitede aktif olarak öğrenim gören kullanıcı |
| İşveren | İş veya staj ilanı yayınlayabilen firma temsilcisi |
| Admin | Sistemi yöneten ve tüm yetkilere sahip kullanıcı |
| Moderatör | İçerik ve kullanıcı denetimi yapan yetkili kullanıcı |
| KVKK | Kişisel Verilerin Korunması Kanunu |
| GDPR | General Data Protection Regulation |
| RBAC | Role-Based Access Control (Rol Tabanlı Yetkilendirme) |
| JWT | JSON Web Token |
| Platform | Mezun Platformu web uygulaması |

**1.4 Hedef Kitle**

Bu dokümanın hedef kitlesi aşağıdaki paydaşlardan oluşmaktadır:

- Yazılım geliştirme ekibi
- Sistem ve veritabanı yöneticileri
- Test ve kalite güvence ekipleri
- Üniversite yönetimi ve ilgili birimler
- Proje danışmanları ve akademik değerlendirme kurulları

**1.5 Referanslar**

- IEEE 830 / IEEE 29148 - Software Requirements Specification Standard
- KVKK Mevzuatı
- GDPR Mevzuatı
- Üniversite Bilgi İşlem Dairesi teknik yönergeleri
- Web tabanlı uygulamalar için OWASP güvenlik rehberi

# 2\. GENEL BAKIŞ

**2.1 Ürün Perspektifi**

Geliştirilecek mezun platformu, üniversitenin mevcut dijital altyapısından bağımsız olarak çalışabilen, ancak gerektiğinde üniversitenin kimlik doğrulama ve bilgi sistemleri ile entegre olabilecek şekilde tasarlanmış web tabanlı bir yazılım sistemidir.

Sistem; kullanıcı arayüzü, uygulama katmanı ve veri katmanı olmak üzere çok katmanlı bir mimariye sahiptir. Platform, masaüstü ve mobil tarayıcılar üzerinden erişilebilir olacak ve modern web teknolojileri kullanılarak geliştirilecektir.

Mezun platformu, üniversitenin mezun-öğrenci-işveren ekosistemini tek bir dijital çatı altında toplamayı hedefleyen merkezi bir sistem olarak konumlandırılmaktadır.

**2.2 Ürün Fonksiyonları**

Sistem aşağıdaki ana fonksiyonel bileşenlerden oluşmaktadır:

- Kullanıcı kayıt ve kimlik doğrulama sistemi
- Rol tabanlı yetkilendirme (RBAC) mekanizması
- Profil oluşturma ve düzenleme fonksiyonları
- İş ve staj ilanı yönetim sistemi
- Etkinlik duyuru ve katılım sistemi
- Kullanıcılar arası mesajlaşma sistemi
- Bildirim ve duyuru mekanizmaları
- Yönetici (admin) ve moderatör paneli
- Raporlama ve istatistiksel özet ekranları

Bu fonksiyonlar, farklı kullanıcı rollerine göre sınırlandırılmış ve yetkilendirilmiş şekilde sunulacaktır.

**2.3 Kullanıcı Karakteristikleri**

Sistem farklı kullanıcı profillerine hitap edecek şekilde tasarlanmıştır. Kullanıcıların teknik bilgi seviyeleri değişkenlik gösterebileceğinden, arayüz sade, anlaşılır ve kullanıcı dostu olacaktır.

- **Öğrenciler:**  
    Temel bilgisayar ve internet kullanım bilgisine sahip, iş ve staj fırsatlarını takip eden kullanıcılar.
- **Mezunlar:**  
    Networking, kariyer fırsatları ve üniversite etkinliklerine erişim amacıyla platformu kullanan kullanıcılar.
- **İşverenler:**  
    İş ve staj ilanı oluşturabilen, başvuruları inceleyebilen ve adaylarla iletişime geçebilen kullanıcılar.
- **Admin / Moderatörler:**  
    Sistem yönetimi, içerik denetimi ve kullanıcı kontrolü yetkilerine sahip, teknik bilgi düzeyi yüksek kullanıcılar.

**2.4 Varsayımlar ve Bağımlılıklar**

**Varsayımlar**

- Kullanıcıların sisteme erişimi için internet bağlantısına sahip olduğu varsayılmaktadır.
- Öğrenci ve mezun doğrulamasının üniversite e-posta adresi veya manuel admin onayı ile yapılacağı varsayılmaktadır.
- Kullanıcıların sağladığı bilgilerin doğruluğundan kendilerinin sorumlu olduğu kabul edilmektedir.
- Platformun ilk aşamada tek bir üniversite için kullanılacağı varsayılmaktadır.

**Bağımlılıklar**

- E-posta gönderimi için üçüncü parti bir e-posta servis sağlayıcısına ihtiyaç duyulmaktadır.
- Dosya yükleme işlemleri için harici bir dosya depolama servisi kullanılabilir.
- Sistem, barındırıldığı sunucu altyapısının sürekliliğine bağlıdır.
- Güvenlik ve kimlik doğrulama mekanizmaları için harici kütüphaneler kullanılacaktır.

**2.5 Kısıtlar**

- Sistem, web tabanlı olarak geliştirilecektir.
- Platform Türkçe dil desteği ile hizmet verecektir.
- Kişisel verilerin işlenmesi ve saklanması KVKK ve GDPR mevzuatına uygun olacaktır.
- Sistem modern web tarayıcıları (Chrome, Firefox, Edge, Safari) ile uyumlu olacaktır.
- Kullanıcı arayüzü responsive (mobil uyumlu) olacak şekilde tasarlanacaktır.
- Kullanılacak teknolojiler, açık kaynak ve sürdürülebilir çözümler arasından seçilecektir.

**2.6 Kullanım Ortamı**

- Sunucu tarafı: Linux tabanlı sunucu ortamı
- İstemci tarafı: Masaüstü ve mobil web tarayıcıları
- Veritabanı: İlişkisel veritabanı yönetim sistemi
- Erişim: HTTPS üzerinden güvenli bağlantı

**2.7 Tasarım ve Uygulama Kısıtları**

- Sistem, rol tabanlı erişim kontrolü prensiplerine uygun olarak geliştirilecektir.
- Veritabanı tasarımı, veri bütünlüğünü ve genişletilebilirliği sağlayacak şekilde oluşturulacaktır.
- Güvenlik açıklarını önlemek amacıyla OWASP önerileri dikkate alınacaktır.
- Sistem mimarisi, ileride farklı üniversiteler için ölçeklenebilir olacak şekilde tasarlanacaktır.

**3\. KULLANICI TİPLERİ VE ROLLER**

**3.1 Genel Bakış**

Mezun platformu, farklı kullanıcı gruplarının ihtiyaçlarına göre şekillendirilmiş rol tabanlı bir erişim kontrol (RBAC) yapısına sahiptir. Her kullanıcı tipi, sistem içerisinde yalnızca kendi rolüne tanımlanmış yetkiler doğrultusunda işlem gerçekleştirebilir.

Bu yapı, sistem güvenliğini artırmak, kullanıcı deneyimini iyileştirmek ve yetkisiz erişimleri önlemek amacıyla uygulanmaktadır.

**3.2 Kullanıcı Rolleri**

Sistemde aşağıdaki kullanıcı rolleri tanımlanmıştır:

- Öğrenci
- Mezun
- İşveren
- Moderatör
- Admin

**3.3 Öğrenci Kullanıcısı**

Öğrenci; üniversitede aktif olarak öğrenim gören ve mezuniyet öncesinde platformdan faydalanan kullanıcı tipidir.

**Yetkiler:**

- Kayıt olma ve sisteme giriş yapma
- Profil oluşturma ve güncelleme
- İş ve staj ilanlarını görüntüleme
- İlanlara başvuru yapma
- Etkinlikleri görüntüleme ve katılım talebinde bulunma
- Diğer kullanıcılarla mesajlaşma (yetkilendirilmiş kullanıcılarla)
- Bildirim alma

**Kısıtlar:**

- İş veya staj ilanı oluşturamaz
- Sistem ayarlarına erişemez
- Diğer kullanıcıları yönetemez

**3.4 Mezun Kullanıcısı**

Mezun; üniversiteden mezun olmuş ve mezun ağına dahil olan kullanıcı tipidir.

**Yetkiler:**

- Kayıt olma ve sisteme giriş yapma
- Profil oluşturma ve düzenleme
- İş ve staj ilanlarını görüntüleme
- İlanlara başvuru yapma
- Etkinlik oluşturma ve yönetme (yetki verilmişse)
- Diğer kullanıcılarla mesajlaşma
- Networking kapsamında kullanıcıları görüntüleme
- Bildirim alma

**Kısıtlar:**

- Admin onayı gerektiren içerikleri doğrudan yayınlayamaz (varsa)
- Sistem yönetimi işlemlerine erişemez

**3.5 İşveren Kullanıcısı**

İşveren; platform üzerinden iş veya staj ilanı yayınlamak isteyen kurum veya firma temsilcisidir.

**Yetkiler:**

- Kayıt olma ve sisteme giriş yapma
- Kurumsal profil oluşturma ve düzenleme
- İş ve staj ilanı oluşturma, düzenleme ve yayından kaldırma
- İlanlara yapılan başvuruları görüntüleme
- Başvuru sahipleriyle mesajlaşma
- Bildirim alma

**Kısıtlar:**

- Öğrenci veya mezun profillerini düzenleyemez
- Sistem ayarlarına erişemez
- Diğer işveren hesaplarını yönetemez

**3.6 Moderatör**

Moderatör; platform üzerindeki içeriklerin denetimini ve düzenini sağlamakla görevli yetkili kullanıcıdır.

**Yetkiler:**

- Kullanıcı profillerini inceleme
- İş ve staj ilanlarını denetleme
- Etkinlik içeriklerini kontrol etme
- Şikâyetleri inceleme ve işlem yapma
- Uygunsuz içerikleri geçici olarak kaldırma
- Kullanıcıları geçici olarak kısıtlama

**Kısıtlar:**

- Sistem yapılandırma ayarlarını değiştiremez
- Admin yetkilerini kullanamaz

**3.7 Admin (Yönetici)**

Admin; sistemin tüm yönetim ve yapılandırma işlemlerinden sorumlu en yetkili kullanıcı tipidir.

**Yetkiler:**

- Tüm kullanıcıları görüntüleme, düzenleme ve silme
- Rol ve yetki atamaları yapma
- Sistem ayarlarını yapılandırma
- İçerik yönetimi ve moderasyon işlemleri
- Raporlama ve istatistikleri görüntüleme
- Sistem loglarını ve hata kayıtlarını inceleme

**Kısıtlar:**

- Yoktur (tam yetkili kullanıcı)

## 3.8 Rol ve Yetki Matrisi (Özet)

| **İşlem / Rol** | **Öğrenci** | **Mezun** | **İşveren** | **Moderatör** | **Admin** |
| --- | --- | --- | --- | --- | --- |
| Profil oluşturma | ✓   | ✓   | ✓   | ✓   | ✓   |
| İlan görüntüleme | ✓   | ✓   | ✓   | ✓   | ✓   |
| İlan oluşturma | ✗   | ✗   | ✓   | ✗   | ✓   |
| İlan denetleme | ✗   | ✗   | ✗   | ✓   | ✓   |
| Etkinlik oluşturma | ✗   | ✓   | ✗   | ✓   | ✓   |
| Mesajlaşma | ✓   | ✓   | ✓   | ✓   | ✓   |
| Kullanıcı yönetimi | ✗   | ✗   | ✗   | ✓   | ✓   |
| Sistem ayarları | ✗   | ✗   | ✗   | ✗   | ✓   |

# 4\. FONKSİYONEL GEREKSİNİMLER

**4.1 Kullanıcı Kayıt, Giriş ve Kimlik Doğrulama**

**4.1.1 Kullanıcı Kayıt Olma**

**Açıklama:  
**Sistem; öğrenci, mezun ve işveren kullanıcılarının platforma kayıt olabilmesini sağlamalıdır. Kayıt süreci kullanıcı rolüne göre farklı doğrulama adımlarını içerebilir.

**Aktörler:  
**Öğrenci, Mezun, İşveren

**Ön Koşullar:**

- Kullanıcı sistemde kayıtlı değildir.
- Kullanıcı geçerli bir e-posta adresine sahiptir.

**Temel Akış:**

- Kullanıcı "Kayıt Ol" ekranını açar.
- Kullanıcı rolünü seçer (Öğrenci / Mezun / İşveren).
- Kullanıcı gerekli bilgileri girer:
  - Ad, soyad
  - E-posta adresi
  - Şifre
  - Rol bazlı ek bilgiler
- Sistem girilen bilgilerin doğruluğunu kontrol eder.
- Sistem kullanıcı hesabını "doğrulama bekliyor" durumunda oluşturur.
- Kullanıcıya doğrulama e-postası gönderilir.
- Kullanıcı doğrulama bağlantısına tıklar.
- Hesap aktif hale gelir.

**Alternatif Akışlar:**

- E-posta adresi sistemde kayıtlıysa kayıt işlemi reddedilir.
- Şifre güvenlik kriterlerini sağlamıyorsa kullanıcı uyarılır.
- Doğrulama e-postası süresi dolarsa yeniden gönderme seçeneği sunulur.

**Validasyon Kuralları:**

- E-posta benzersiz olmalıdır.
- Şifre en az 8 karakter uzunluğunda olmalıdır.
- Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir.

**Kabul Kriterleri:**

- Kullanıcı başarıyla kayıt olabilmelidir.
- Doğrulanmamış kullanıcı sisteme giriş yapamamalıdır.

**4.1.2 Öğrenci ve Mezun Doğrulama**

**Açıklama:  
**Öğrenci ve mezun kullanıcıların üniversite ile ilişkisinin doğrulanması gerekmektedir.

**Doğrulama Yöntemleri:**

- Üniversite uzantılı e-posta adresi doğrulaması
- Admin tarafından manuel onay
- (Opsiyonel) Öğrenci numarası veya mezuniyet bilgisi doğrulaması

**İş Kuralları:**

- Doğrulama tamamlanmadan kullanıcı ilanlara başvuramaz.
- Doğrulama durumu kullanıcı profilinde görüntülenir.

**4.1.3 Kullanıcı Giriş Yapma**

**Açıklama:  
**Kayıtlı kullanıcılar e-posta ve şifre bilgileri ile sisteme giriş yapabilmelidir.

**Aktörler:  
**Tüm kullanıcı rolleri

**Temel Akış:**

- Kullanıcı giriş ekranını açar.
- E-posta ve şifre bilgilerini girer.
- Sistem bilgileri doğrular.
- Başarılı doğrulama sonrası kullanıcı sisteme yönlendirilir.

**Alternatif Akışlar:**

- Hatalı giriş bilgisi → uyarı mesajı
- Hesap pasif veya askıda → bilgilendirme mesajı
- Çok sayıda başarısız giriş → geçici hesap kilidi

**Güvenlik Gereksinimleri:**

- Oturum JWT veya benzeri güvenli token ile yönetilmelidir.
- Oturum süresi belirli bir zaman sonra otomatik sonlandırılmalıdır.

**4.1.4 Şifre Sıfırlama**

**Açıklama:  
**Kullanıcılar şifrelerini unuttuklarında güvenli bir şekilde sıfırlayabilmelidir.

**Temel Akış:**

- Kullanıcı "Şifremi Unuttum" seçeneğini seçer.
- E-posta adresini girer.
- Sistem şifre sıfırlama bağlantısı gönderir.
- Kullanıcı yeni şifre belirler.
- Şifre güncellenir.

**İş Kuralları:**

- Şifre sıfırlama bağlantısı süreli olmalıdır.
- Eski şifreler tekrar kullanılamamalıdır.

**4.1.5 Çıkış Yapma**

**Açıklama:  
**Kullanıcılar aktif oturumlarını sonlandırabilmelidir.

**Temel Akış:**

- Kullanıcı "Çıkış Yap" seçeneğini seçer.
- Sistem aktif oturumu sonlandırır.
- Kullanıcı giriş ekranına yönlendirilir.

**Kabul Kriterleri:**

- Çıkış sonrası kullanıcı yetkili sayfalara erişememelidir.

**4.1.6 Hesap Silme ve Dondurma**

**Açıklama:  
**Kullanıcılar hesaplarını kalıcı olarak silebilmeli veya geçici olarak dondurabilmelidir.

**İş Kuralları:**

- Hesap silme işlemi geri alınamaz.
- KVKK kapsamında kullanıcı verileri anonimleştirilmelidir.
- Admin tarafından hesap dondurma işlemi yapılabilmelidir.

**4.2 Profil Yönetimi**

**4.2.1 Profil Oluşturma**

**Açıklama:  
**Sistem, kullanıcıların rollerine uygun şekilde kişisel veya kurumsal profiller oluşturabilmesini sağlamalıdır.

**Aktörler:  
**Öğrenci, Mezun, İşveren

**Ön Koşullar:**

- Kullanıcı sisteme giriş yapmış olmalıdır.
- Kullanıcının hesabı aktif durumda olmalıdır.

**Profil Türleri ve Alanlar:**

**Öğrenci / Mezun Profili:**

- Ad, soyad
- Profil fotoğrafı
- Bölüm / Program
- Mezuniyet yılı (mezunlar için)
- Kısa biyografi
- Yetenekler
- Eğitim bilgileri
- İş deneyimleri (opsiyonel)
- CV yükleme (PDF)
- İletişim bilgileri

**İşveren Profili:**

- Firma adı
- Firma logosu
- Sektör
- Firma açıklaması
- Web sitesi ve iletişim bilgileri

**Kabul Kriterleri:**

- Kullanıcı rolüne uygun olmayan alanları göremez.
- Zorunlu alanlar boş bırakılamaz.

**4.2.2 Profil Güncelleme**

**Açıklama:  
**Kullanıcılar kendi profillerini istedikleri zaman güncelleyebilmelidir.

**Temel Akış:**

- Kullanıcı "Profilim" sayfasına girer.
- Güncellemek istediği alanları düzenler.
- "Kaydet" butonuna basar.
- Sistem değişiklikleri kaydeder.

**İş Kuralları:**

- Profil güncellemeleri anında geçerli olmalıdır.
- Admin gerekli gördüğü durumlarda profil değişikliklerini onaya tabi tutabilir.

**4.2.3 Profil Görünürlük Ayarları**

**Açıklama:  
**Kullanıcılar, profillerindeki bilgilerin kimler tarafından görüntülenebileceğini belirleyebilmelidir.

**Görünürlük Seçenekleri:**

- Herkese açık
- Sadece kayıtlı kullanıcılar
- Sadece işverenler
- Gizli

**İş Kuralları:**

- E-posta ve telefon bilgileri varsayılan olarak gizli olmalıdır.
- İşverenler, yalnızca izin verilen alanları görüntüleyebilir.

**4.2.4 Profil Görüntüleme**

**Açıklama:  
**Kullanıcılar, diğer kullanıcıların profillerini yetkileri dahilinde görüntüleyebilmelidir.

**Kısıtlar:**

- Kullanıcı, kendi rolüne göre erişim izni olmayan alanları göremez.
- Gizli profiller yalnızca sahibi ve admin tarafından görüntülenebilir.

**4.2.5 CV ve Dosya Yönetimi**

**Açıklama:  
**Öğrenci ve mezun kullanıcılar özgeçmiş (CV) ve ilgili belgeleri sisteme yükleyebilmelidir.

**İş Kuralları:**

- Yalnızca belirlenen dosya formatları kabul edilir (PDF).
- Dosya boyutu sınırı uygulanmalıdır.
- Yüklenen dosyalar güvenli bir ortamda saklanmalıdır.

**4.2.6 Profil Silme**

**Açıklama:  
**Kullanıcılar profillerini ve buna bağlı verilerini sistemden kalıcı olarak silebilmelidir.

**İş Kuralları:**

- Profil silme işlemi kullanıcı onayı gerektirir.
- Silinen profil geri getirilemez.
- KVKK kapsamında veriler anonimleştirilir veya silinir.

**4.2.7 Profil Yönetimi - Kabul Kriterleri**

- Kullanıcılar profillerini sorunsuz oluşturabilmelidir.
- Profil güncellemeleri veri kaybı olmadan kaydedilmelidir.
- Yetkisiz kullanıcılar gizli bilgilere erişememelidir.

**4.3 İş ve Staj İlanları Yönetimi**

**4.3.1 İlan Oluşturma**

**Açıklama:  
**Sistem, işveren kullanıcılarının ve yetki verilmiş adminlerin iş ve staj ilanları oluşturabilmesini sağlamalıdır.

**Aktörler:  
İşveren, Admin**

**Ön Koşullar:**

- Kullanıcı sisteme giriş yapmış olmalıdır.
- İşveren hesabı onaylanmış olmalıdır.

**İlan Bilgileri:**

- İlan başlığı
- Pozisyon türü (İş / Staj)
- Çalışma şekli (Tam zamanlı / Yarı zamanlı / Uzaktan)
- Şehir / Lokasyon
- Bölüm / Alan
- Aranan nitelikler
- İş tanımı
- Son başvuru tarihi

**Temel Akış:**

- İşveren "İlan Oluştur" ekranına girer.
- İlan bilgilerini doldurur.
- İlanı kaydeder.
- Sistem ilanı "onay bekliyor" durumuna alır.
- Moderatör/Admin onayı sonrası ilan yayınlanır.

**Alternatif Akışlar:**

- Eksik veya hatalı bilgi girilirse sistem uyarı verir.
- Onay reddedilirse ilan taslak durumuna alınır.

**4.3.2 İlan Güncelleme ve Silme**

**Açıklama:  
**İşverenler yayınladıkları ilanları güncelleyebilmeli veya yayından kaldırabilmelidir.

**İş Kuralları:**

- Yayınlanan bir ilanda yapılan değişiklikler tekrar onaya tabi tutulabilir.
- Süresi dolan ilanlar otomatik olarak pasif hale getirilir.

**4.3.3 İlan Görüntüleme ve Arama**

**Açıklama:  
**Kullanıcılar iş ve staj ilanlarını görüntüleyebilmelidir.

**Aktörler:  
**Öğrenci, Mezun, İşveren, Admin

**Arama ve Filtreleme Kriterleri:**

- Pozisyon türü
- Şehir
- Çalışma şekli
- Bölüm / Alan
- Firma adı

**4.3.4 İlanlara Başvuru Yapma**

**Açıklama:  
**Öğrenci ve mezun kullanıcılar ilanlara başvuru yapabilmelidir.

**Ön Koşullar:**

- Kullanıcı doğrulanmış olmalıdır.
- Profil bilgileri tamamlanmış olmalıdır.

**Temel Akış:**

- Kullanıcı ilan detayını açar.
- "Başvur" butonuna tıklar.
- Sistem başvuruyu kaydeder.
- İşverene bildirim gönderilir.

**İş Kuralları:**

- Aynı ilana birden fazla başvuru yapılamaz.
- Başvuru durumu kullanıcı tarafından görüntülenebilir.

**4.3.5 Başvuru Yönetimi**

**Açıklama:  
**İşverenler, ilanlarına yapılan başvuruları görüntüleyip değerlendirebilmelidir.

**Başvuru Durumları:**

- Alındı
- İnceleniyor
- Olumlu
- Olumsuz

**İş Kuralları:**

- Durum değişiklikleri başvuru sahibine bildirilmelidir.
- Başvurular KVKK kapsamında gizli tutulmalıdır.

**4.3.6 İlan Moderasyonu**

**Açıklama:  
**Moderatör ve admin kullanıcılar, ilanları denetleyebilmeli ve gerektiğinde müdahale edebilmelidir.

**Yetkiler:**

- İlanı yayından kaldırma
- İlanı düzenleme
- İlan sahibini uyarma
- İlanı kalıcı olarak silme

**4.3.7 Kabul Kriterleri**

- Yetkili kullanıcılar ilan oluşturabilmelidir.
- Yetkisiz kullanıcılar ilan oluşturamamalıdır.
- Başvurular eksiksiz kaydedilmelidir.
- İlanlar moderasyon sürecinden sonra yayınlanmalıdır.

**4.4 Etkinlik Yönetimi**

**4.4.1 Etkinlik Oluşturma**

**Açıklama:  
**Sistem; üniversite yönetimi, yetkilendirilmiş mezunlar ve admin kullanıcıların etkinlik oluşturabilmesini sağlamalıdır.

**Aktörler:  
**Mezun, Admin, Moderatör

**Ön Koşullar:**

- Kullanıcı sisteme giriş yapmış olmalıdır.
- Kullanıcının etkinlik oluşturma yetkisi bulunmalıdır.

**Etkinlik Bilgileri:**

- Etkinlik adı
- Etkinlik türü (Seminer, Kariyer Günü, Webinar, Buluşma vb.)
- Etkinlik açıklaması
- Tarih ve saat
- Konum (fiziksel / çevrim içi)
- Kontenjan (opsiyonel)
- Etkinlik görseli

**Temel Akış:**

- Yetkili kullanıcı "Etkinlik Oluştur" ekranını açar.
- Etkinlik bilgilerini girer.
- Etkinliği kaydeder.
- Etkinlik moderasyon onayına gönderilir.
- Onaylanan etkinlik yayınlanır.

**4.4.2 Etkinlik Güncelleme ve Silme**

**Açıklama:  
**Etkinlik oluşturucuları ve adminler etkinlik bilgilerini güncelleyebilmelidir.

**İş Kuralları:**

- Tarihi geçmiş etkinlikler düzenlenemez.
- Etkinlik iptali durumunda katılımcılar bilgilendirilir.

**4.4.3 Etkinlik Görüntüleme**

**Açıklama:  
**Kullanıcılar yayınlanmış etkinlikleri görüntüleyebilmelidir.

**Aktörler:  
**Tüm kullanıcı rolleri

**Filtreleme Seçenekleri:**

- Tarih
- Etkinlik türü
- Konum

**4.4.4 Etkinliğe Katılım**

**Açıklama:  
**Kullanıcılar etkinliklere katılım talebinde bulunabilmelidir.

**Temel Akış:**

- Kullanıcı etkinlik detay sayfasını açar.
- "Katıl" butonuna tıklar.
- Sistem katılımı kaydeder.
- Kullanıcıya bildirim gönderilir.

**İş Kuralları:**

- Kontenjan dolduğunda katılım kapatılır.
- Katılım durumu kullanıcı profilinde görüntülenir.

**4.4.5 Etkinlik Bildirimleri**

**Açıklama:  
**Sistem, etkinliklerle ilgili bildirimleri otomatik olarak göndermelidir.

**Bildirim Senaryoları:**

- Etkinlik onaylandı
- Etkinlik yaklaşıyor
- Etkinlik iptal edildi
- Etkinlik günü hatırlatma

**4.4.6 Etkinlik Moderasyonu**

**Açıklama:  
**Moderatörler etkinlik içeriklerini denetleyebilmelidir.

**Yetkiler:**

- Etkinliği onaylama / reddetme
- Etkinliği yayından kaldırma
- Etkinlik sahibini uyarma

**4.4.7 Kabul Kriterleri**

- Yetkili kullanıcılar etkinlik oluşturabilmelidir.
- Katılım işlemleri doğru şekilde kaydedilmelidir.
- Bildirimler zamanında gönderilmelidir.

**4.5 Mesajlaşma ve Networking**

**4.5.1 Kullanıcılar Arası Mesajlaşma**

**Açıklama:  
**Sistem, kullanıcıların platform üzerinden birbirleriyle doğrudan mesajlaşabilmesini sağlamalıdır.

**Aktörler:  
**Öğrenci, Mezun, İşveren, Moderatör, Admin

**Ön Koşullar:**

- Kullanıcı sisteme giriş yapmış olmalıdır.
- Mesajlaşma yetkisi bulunmalıdır.

**Temel Akış:**

- Kullanıcı başka bir kullanıcının profilini görüntüler.
- "Mesaj Gönder" seçeneğini seçer.
- Mesaj içeriğini yazar ve gönderir.
- Sistem mesajı alıcıya iletir.
- Alıcıya bildirim gönderilir.

**4.5.2 Mesajlaşma Kuralları ve Kısıtlar**

**İş Kuralları:**

- Öğrenciler yalnızca mezunlar ve işverenlerle mesajlaşabilir.
- İşverenler yalnızca başvuru yapan veya iletişime izin veren kullanıcılarla mesajlaşabilir.
- Aynı kullanıcıya kısa sürede çok sayıda mesaj gönderimi sınırlandırılmalıdır.
- Uygunsuz içerik tespitinde mesajlar raporlanabilir.

**4.5.3 Mesaj Görüntüleme ve Yönetimi**

**Açıklama:  
**Kullanıcılar mesaj geçmişlerini görüntüleyebilmelidir.

**Özellikler:**

- Okundu / okunmadı durumu
- Mesaj silme (kullanıcı tarafında)
- Mesaj arama (opsiyonel)

**4.5.4 Networking Özellikleri**

**Açıklama:  
**Sistem, mezunlar ve öğrenciler arasında profesyonel bağlantılar kurulmasını desteklemelidir.

**Networking Fonksiyonları:**

- Profil görüntüleme
- İlgi alanlarına göre kullanıcı önerileri
- Etkinlik katılımcıları arasında bağlantı kurma

**4.5.5 Spam ve Kötüye Kullanım Önleme**

**Açıklama:  
**Mesajlaşma sistemi kötüye kullanımı önleyecek mekanizmalara sahip olmalıdır.

**Önlemler:**

- Mesaj gönderim limiti
- Şikâyet etme özelliği
- Otomatik filtreleme (küfür, spam anahtar kelimeler)
- Moderatör incelemesi

**4.5.6 Mesajlaşma Moderasyonu**

**Açıklama:  
**Moderatörler şikâyet edilen mesajları inceleyebilmelidir.

**Yetkiler:**

- Mesajları görüntüleme
- Mesajları silme
- Kullanıcıyı uyarma veya kısıtlama

**4.5.7 Kabul Kriterleri**

- Kullanıcılar güvenli şekilde mesajlaşabilmelidir.
- Spam ve kötüye kullanım engellenmelidir.
- Mesaj bildirimleri doğru çalışmalıdır.

**4.6 Bildirim Sistemi**

**4.6.1 Genel Tanım**

**Açıklama:  
**Sistem, kullanıcıları platform üzerindeki önemli olaylar hakkında bilgilendirmek amacıyla bildirim mekanizmasına sahip olmalıdır. Bildirimler, sistem içi (uygulama içi) ve e-posta kanalları üzerinden iletilebilir.

**4.6.2 Bildirim Türleri**

**Sistem aşağıdaki bildirim türlerini desteklemelidir:**

- Kullanıcı kayıt ve doğrulama bildirimleri
- Şifre sıfırlama bildirimleri
- İş ve staj ilanı başvuru bildirimleri
- Başvuru durumu değişikliği bildirimleri
- Etkinlik bildirimleri (onay, hatırlatma, iptal)
- Mesaj alındı bildirimleri
- Admin ve moderatör uyarıları

**4.6.3 Bildirim Gönderim Kanalları**

**Desteklenen Kanallar:**

- Sistem içi bildirim (dashboard / bildirim merkezi)
- E-posta bildirimi

**İş Kuralları:**

- Kritik işlemler (şifre sıfırlama, doğrulama) e-posta ile gönderilmelidir.
- Sistem içi bildirimler kullanıcı panelinde saklanmalıdır.

**4.6.4 Bildirim Tercihleri**

**Açıklama:  
**Kullanıcılar, hangi bildirimleri hangi kanaldan almak istediklerini belirleyebilmelidir.

**Tercih Edilebilir Ayarlar:**

- E-posta bildirimi açık / kapalı
- Etkinlik bildirimleri açık / kapalı
- Mesaj bildirimleri açık / kapalı

**İş Kuralları:**

- Zorunlu sistem bildirimleri kapatılamaz.
- Tercih değişiklikleri anında geçerli olur.

**4.6.5 Bildirim Zamanlaması**

**Zamanlama Senaryoları:**

- Anlık bildirim (mesaj, başvuru)
- Zamanlı bildirim (etkinlikten 1 gün önce)
- Periyodik bildirim (opsiyonel özet e-postalar)

**4.6.6 Bildirim Yönetimi**

**Açıklama:  
**Kullanıcılar bildirimlerini görüntüleyebilmeli ve yönetebilmelidir.

**Fonksiyonlar:**

- Bildirimi okundu olarak işaretleme
- Bildirim silme
- Tüm bildirimleri temizleme

**4.6.7 Kabul Kriterleri**

- Bildirimler doğru kullanıcıya iletilmelidir.
- Bildirim tercihleri eksiksiz uygulanmalıdır.
- Bildirim gecikmeleri minimum düzeyde olmalıdır.

Sistem, admin kullanıcıların platformu merkezi olarak yönetebileceği bir yönetim paneli sunmalıdır.

**Fonksiyonlar:**

- Kullanıcı yönetimi
- Rol ve yetki atamaları
- İçerik yönetimi
- Sistem ayarları
- Raporlama ve istatistikler

**4.7.2 Kullanıcı Yönetimi**

**Açıklama:  
**Admin ve moderatörler kullanıcı hesaplarını yönetebilmelidir.

**Yetkiler:**

- Kullanıcı görüntüleme
- Kullanıcı düzenleme
- Kullanıcı silme
- Hesap dondurma / aktifleştirme
- Kullanıcı rolü değiştirme (admin)

**İş Kuralları:**

- Silinen kullanıcıya ait içerikler arşivlenebilir.
- Kritik işlemler loglanmalıdır.

**4.7.3 İçerik Moderasyonu**

**Açıklama:  
**Moderatörler platform üzerindeki içerikleri denetleyebilmelidir.

**Denetlenen İçerikler:**

- Kullanıcı profilleri
- İş ve staj ilanları
- Etkinlikler
- Mesajlar (şikâyet edilen)

**Yetkiler:**

- İçeriği yayından kaldırma
- İçeriği düzenleme
- İçerik sahibini uyarma

**4.7.4 Şikâyet ve İnceleme Yönetimi**

**Açıklama:  
**Kullanıcılar uygunsuz içerik veya davranışları şikâyet edebilmelidir.

**Temel Akış:**

- Kullanıcı içeriği şikâyet eder.
- Sistem şikâyeti kaydeder.
- Moderatör inceleme yapar.
- Gerekli aksiyon alınır.
- Şikâyet sonucu ilgili kullanıcılara bildirilir.

**4.7.5 Sistem Ayarları Yönetimi**

**Açıklama:  
**Admin, platformun genel yapılandırma ayarlarını yönetebilmelidir.

**Ayarlar:**

- Kayıt ayarları
- Rol yetkilendirme
- Bildirim ayarları
- Güvenlik politikaları

**4.7.6 Loglama ve Denetim Kayıtları**

**Açıklama:  
**Sistem, kritik işlemleri kayıt altına almalıdır.

**Loglanan İşlemler:**

- Giriş / çıkış işlemleri
- Rol değişiklikleri
- İçerik silme ve düzenleme
- Sistem ayarları değişiklikleri

**İş Kuralları:**

- Loglar yalnızca admin tarafından erişilebilir olmalıdır.
- Log kayıtları silinemez olmalıdır.

**4.7.7 Kabul Kriterleri**

- Admin paneli güvenli şekilde erişilebilir olmalıdır.
- Moderasyon işlemleri izlenebilir olmalıdır.
- Yetkisiz kullanıcılar yönetim işlemleri yapamamalıdır.

# 5\. FONKSİYONEL OLMAYAN GEREKSİNİMLER

**5.1 Performans Gereksinimleri**

- Sistem, eş zamanlı en az **1.000 aktif kullanıcıyı** destekleyebilmelidir.
- Sayfa yüklenme süresi ortalama **3 saniyeden kısa** olmalıdır.
- Kritik işlemler (giriş, başvuru, mesaj gönderimi) **2 saniye içinde** tamamlanmalıdır.
- Veritabanı sorguları optimize edilerek performans düşüşleri önlenmelidir.

**5.2 Güvenlik Gereksinimleri**

- Tüm veri iletimi **HTTPS** üzerinden yapılmalıdır.
- Kullanıcı şifreleri **hashlenmiş** şekilde saklanmalıdır.
- Sistem **JWT tabanlı kimlik doğrulama** kullanmalıdır.
- Rol tabanlı erişim kontrolü (RBAC) uygulanmalıdır.
- Brute-force saldırılarına karşı giriş denemeleri sınırlandırılmalıdır.
- OWASP Top 10 güvenlik açıklarına karşı önlemler alınmalıdır.
- Yetkisiz veri erişimleri loglanmalıdır.

**5.3 Kullanılabilirlik (Usability) Gereksinimleri**

- Sistem kullanıcı dostu ve sezgisel bir arayüze sahip olmalıdır.
- Yeni kullanıcılar temel işlemleri **rehber olmadan** gerçekleştirebilmelidir.
- Hata mesajları anlaşılır ve yönlendirici olmalıdır.
- Kullanıcı işlemleri mümkün olan en az adımda tamamlanmalıdır.

**5.4 Erişilebilirlik Gereksinimleri**

- Sistem **WCAG 2.1 AA** standartlarına uygun olmalıdır.
- Klavye ile erişim desteklenmelidir.
- Renk körlüğü ve düşük görme durumları için yeterli kontrast sağlanmalıdır.
- Görseller için alternatif metinler (alt-text) kullanılmalıdır.

**5.5 Ölçeklenebilirlik Gereksinimleri**

- Sistem, artan kullanıcı sayısına göre yatay olarak ölçeklenebilir olmalıdır.
- Yeni modüller sisteme minimum değişiklikle eklenebilmelidir.
- İleride farklı üniversiteler için kullanılabilecek şekilde genişletilebilir olmalıdır.

**5.6 Güvenilirlik ve Süreklilik**

- Sistem yıllık **%99 erişilebilirlik** oranını hedeflemelidir.
- Sistem hatalarında kullanıcıya anlamlı hata mesajları gösterilmelidir.
- Kritik sistem hataları için otomatik bildirim mekanizması bulunmalıdır.

**5.7 Yedekleme ve Kurtarma**

- Veritabanı günlük olarak yedeklenmelidir.
- Yedekler güvenli ve erişim kısıtlı ortamlarda saklanmalıdır.
- Veri kaybı durumunda sistem en fazla **24 saatlik veri kaybı** ile geri döndürülebilmelidir.

**5.8 Veri Gizliliği ve KVKK Uyumu**

- Kullanıcı verileri KVKK ve GDPR mevzuatına uygun şekilde işlenmelidir.
- Kullanıcı, kişisel verilerini görüntüleyebilmeli ve silebilmelidir.
- Veri saklama süreleri tanımlanmalı ve uygulanmalıdır.

**5.9 Loglama ve Denetim**

- Tüm kritik işlemler loglanmalıdır.
- Loglar değiştirilemez ve silinemez olmalıdır.
- Log kayıtları en az **1 yıl** süreyle saklanmalıdır.

**5.10 Kabul Kriterleri**

- Sistem güvenli, performanslı ve kararlı çalışmalıdır.
- NFR gereksinimleri test senaryoları ile doğrulanmalıdır.
- Mevzuata aykırı durum oluşmamalıdır.

# 6\. KULLANICI ARAYÜZÜ GEREKSİNİMLERİ

**6.1 Genel UI Tasarım Prensipleri**

- Arayüz sade, anlaşılır ve kullanıcı dostu olmalıdır.
- Tüm sayfalarda tutarlı renk paleti, font ve ikon seti kullanılmalıdır.
- Kullanıcıyı yormayan, modern web tasarım prensipleri uygulanmalıdır.
- Kullanıcı hataları açık ve anlaşılır mesajlarla belirtilmelidir.
- Kritik işlemler (silme, iptal vb.) için onay mekanizması bulunmalıdır.

**6.2 Responsive Tasarım**

- Sistem masaüstü, tablet ve mobil cihazlarda sorunsuz çalışmalıdır.
- Tüm sayfalar responsive (mobil uyumlu) olacak şekilde tasarlanmalıdır.
- Mobil cihazlarda dokunmatik kullanım göz önünde bulundurulmalıdır.
- Küçük ekranlarda gereksiz bilgiler gizlenmeli veya sadeleştirilmelidir.

**6.3 Giriş ve Kayıt Ekranları**

- Giriş ve kayıt ekranları sade ve yönlendirici olmalıdır.
- Şifre alanları gizli şekilde gösterilmelidir.
- Hatalı girişlerde kullanıcı bilgilendirilmelidir.
- "Şifremi Unuttum" bağlantısı kolay erişilebilir olmalıdır.

**6.4 Ana Sayfa (Dashboard)**

- Kullanıcı rolüne göre özelleştirilmiş içerik gösterilmelidir.
- Öne çıkan ilanlar ve etkinlikler görüntülenmelidir.
- Bildirim özetleri ana sayfada yer almalıdır.
- Hızlı erişim butonları sunulmalıdır.

**6.5 Profil Sayfaları**

- Profil bilgileri düzenli ve okunabilir şekilde sunulmalıdır.
- Profil düzenleme işlemleri kullanıcı dostu olmalıdır.
- Görünürlük ayarları kolay erişilebilir olmalıdır.
- CV ve dosya indirme bağlantıları açıkça belirtilmelidir.

**6.6 İlan ve Etkinlik Sayfaları**

- İlan ve etkinlik listeleri filtrelenebilir olmalıdır.
- Detay sayfalarında bilgiler açık ve düzenli sunulmalıdır.
- "Başvur" ve "Katıl" butonları net şekilde görünmelidir.

**6.7 Mesajlaşma Arayüzü**

- Mesajlaşma ekranı sohbet mantığında çalışmalıdır.
- Okunmamış mesajlar vurgulanmalıdır.
- Bildirim ve mesaj entegrasyonu sağlanmalıdır.

**6.8 Admin Paneli Arayüzü**

- Yönetim paneli kullanıcı arayüzünden ayrı olmalıdır.
- Tablo bazlı yönetim ekranları sunulmalıdır.
- Arama, filtreleme ve sıralama özellikleri bulunmalıdır.
- Yetkisiz erişimler engellenmelidir.

**6.9 UI Kabul Kriterleri**

- Tüm ekranlar responsive çalışmalıdır.
- Kullanıcılar temel işlemleri kolayca yapabilmelidir.
- UI bileşenleri farklı tarayıcılarda tutarlı görünmelidir.

# 7\. VERİ GEREKSİNİMLERİ

**7.1 Genel Veri Yönetimi İlkeleri**

- Sistem, ilişkisel bir veritabanı kullanmalıdır.
- Tüm veriler tutarlı, bütünlüklü ve doğrulanmış şekilde saklanmalıdır.
- Veri tekrarını azaltmak için normalizasyon kuralları uygulanmalıdır.
- Kritik veriler için referans bütünlüğü sağlanmalıdır.
- Kişisel veriler güvenli şekilde saklanmalıdır.

**7.2 Temel Veri Varlıkları**

**7.2.1 Kullanıcı (User)**

**Alanlar:**

- Kullanıcı ID (benzersiz)
- Ad
- Soyad
- E-posta
- Şifre (hashlenmiş)
- Rol
- Hesap durumu (aktif / pasif / askıda)
- Kayıt tarihi
- Son giriş tarihi

**7.2.2 Profil**

**Alanlar:**

- Profil ID
- Kullanıcı ID (FK)
- Profil türü (Öğrenci / Mezun / İşveren)
- Profil açıklaması
- Görünürlük ayarları
- Profil fotoğrafı
- Oluşturulma / güncellenme tarihi

**7.2.3 İş ve Staj İlanı**

**Alanlar:**

- İlan ID
- İşveren ID
- İlan başlığı
- İlan türü
- Açıklama
- Lokasyon
- Son başvuru tarihi
- Durum (taslak / onay bekliyor / yayınlandı / kapalı)

**7.2.4 Başvuru**

**Alanlar:**

- Başvuru ID
- İlan ID
- Kullanıcı ID
- Başvuru tarihi
- Başvuru durumu

**7.2.5 Etkinlik**

**Alanlar:**

- Etkinlik ID
- Oluşturan kullanıcı ID
- Etkinlik adı
- Açıklama
- Tarih ve saat
- Konum
- Kontenjan
- Durum

**7.2.6 Mesaj**

**Alanlar:**

- Mesaj ID
- Gönderen ID
- Alıcı ID
- Mesaj içeriği
- Gönderim tarihi
- Okundu durumu

**7.2.7 Bildirim**

**Alanlar:**

- Bildirim ID
- Kullanıcı ID
- Bildirim türü
- İçerik
- Okundu durumu
- Oluşturulma tarihi

**7.3 Veri Bütünlüğü Kuralları**

- Her profil yalnızca bir kullanıcıya ait olmalıdır.
- Bir ilan yalnızca bir işverene ait olabilir.
- Başvurular ilgili ilan silinse bile arşivlenmelidir.
- Silinen kullanıcı verileri anonimleştirilmelidir.

**7.4 Veri Doğrulama Kuralları**

- Zorunlu alanlar boş bırakılamaz.
- Tarih alanları geçerli formatta olmalıdır.
- E-posta adresleri benzersiz olmalıdır.
- Referans alanlar (FK) geçerli kayıtları göstermelidir.

**7.5 Veri Saklama ve Silme Politikaları**

- Kişisel veriler yalnızca gerekli olduğu süre boyunca saklanmalıdır.
- Kullanıcı talebi üzerine veriler silinmeli veya anonimleştirilmelidir.
- Log ve denetim kayıtları en az 1 yıl saklanmalıdır.

**7.6 KVKK ve GDPR Uyumu**

- Kullanıcı açık rızası alınmalıdır.
- Kullanıcılar verilerine erişim talep edebilmelidir.
- Veri işleme amaçları açıkça belirtilmelidir.
- Veri ihlali durumunda gerekli bildirimler yapılmalıdır.

**7.7 Kabul Kriterleri**

- Veri tutarlılığı sağlanmalıdır.
- Yetkisiz erişim engellenmelidir.
- Veri kaybı yaşanmamalıdır.

# 8\. ENTEGRASYON GEREKSİNİMLERİ

**8.1 Genel Entegrasyon Yaklaşımı**

Sistem, ihtiyaç duyulan durumlarda harici servisler ile entegre çalışabilecek şekilde tasarlanmalıdır. Entegrasyonlar, sistem güvenliğini ve veri gizliliğini tehlikeye atmayacak biçimde gerçekleştirilmelidir.

Tüm dış servis iletişimleri güvenli protokoller üzerinden yapılmalıdır.

**8.2 E-posta Servisi Entegrasyonu**

**Açıklama:**  
Sistem, kullanıcılarla iletişim kurmak amacıyla harici bir e-posta servis sağlayıcısı ile entegre çalışmalıdır.

**Kullanım Senaryoları:**

- Hesap doğrulama e-postaları
- Şifre sıfırlama e-postaları
- Bildirim e-postaları
- Admin bilgilendirme mesajları

**Gereksinimler:**

- E-posta gönderimleri asenkron olarak yapılmalıdır.
- Gönderim hataları loglanmalıdır.
- Spam filtrelerine takılmayacak yapılandırmalar uygulanmalıdır.

**8.3 Dosya Depolama Entegrasyonu**

**Açıklama:**  
CV ve görsel gibi dosyaların güvenli şekilde saklanabilmesi için harici bir dosya depolama servisi kullanılabilir.

**Gereksinimler:**

- Dosyalara erişim yetkilendirme ile sınırlandırılmalıdır.
- Dosya bağlantıları süreli (temporary) olmalıdır.
- Yetkisiz erişimler engellenmelidir.

**8.4 Üniversite Sistemleri Entegrasyonu (Opsiyonel)**

**Açıklama:**  
Platform, üniversitenin mevcut bilgi sistemleri ile entegre edilebilir.

**Olası Entegrasyonlar:**

- Öğrenci bilgi sistemi (öğrenci doğrulama)
- Mezun bilgi sistemi
- Kurumsal kimlik doğrulama (SSO)

**İş Kuralları:**

- Entegrasyonlar yalnızca yetkilendirilmiş erişimler üzerinden yapılmalıdır.
- Kişisel veriler yalnızca gerekli olduğu ölçüde paylaşılmalıdır.

**8.5 API Gereksinimleri**

**Açıklama:**  
Sistem, modüler bir yapı için API tabanlı çalışmalıdır.

**API Özellikleri:**

- RESTful mimari
- JSON veri formatı
- Yetkilendirme için token bazlı yapı
- Hata durumları için standart HTTP durum kodları

**8.6 Üçüncü Parti Servis Kullanımı**

**Olası Servisler:**

- Harita servisleri (etkinlik lokasyonu)
- Analitik servisler
- Bildirim servisleri

**Gereksinimler:**

- Üçüncü parti servisler güvenilir olmalıdır.
- Servis kesintilerinde sistem temel fonksiyonlarını sürdürebilmelidir.

**8.7 Kabul Kriterleri**

- Entegrasyonlar hatasız çalışmalıdır.
- Harici servis hataları sistemi çökertmemelidir.
- Veri güvenliği ihlal edilmemelidir.

# 9\. TEST GEREKSİNİMLERİ

**9.1 Test Yaklaşımı**

Sistem, geliştirme sürecinin her aşamasında test edilmelidir. Testler, fonksiyonel ve fonksiyonel olmayan gereksinimlerin doğrulanmasını amaçlamaktadır.

Test süreci; manuel testler ve otomatik testlerden oluşacaktır.

**9.2 Test Türleri**

**9.2.1 Birim Testleri (Unit Testing)**

- Her fonksiyon ve modül ayrı ayrı test edilmelidir.
- Kritik iş mantıkları için birim testleri zorunludur.
- Hatalar erken aşamada tespit edilmelidir.

**9.2.2 Entegrasyon Testleri**

- Modüller arası veri akışı test edilmelidir.
- Harici servis entegrasyonları doğrulanmalıdır.
- API çağrıları test edilmelidir.

**9.2.3 Sistem Testleri**

- Sistem uçtan uca test edilmelidir.
- Tüm fonksiyonel gereksinimler doğrulanmalıdır.
- Gerçek kullanıcı senaryoları simüle edilmelidir.

**9.2.4 Kullanıcı Kabul Testleri (UAT)**

- Testler gerçek kullanıcı rolleri ile yapılmalıdır.
- Kullanıcı geri bildirimleri dikkate alınmalıdır.
- Sistem kabul kriterlerini karşılamalıdır.

**9.2.5 Performans Testleri**

- Yük testleri yapılmalıdır.
- Sistem eş zamanlı kullanıcı taleplerine dayanıklı olmalıdır.
- Performans darboğazları tespit edilmelidir.

**9.2.6 Güvenlik Testleri**

- Yetkilendirme testleri yapılmalıdır.
- Zafiyet taramaları uygulanmalıdır.
- Giriş güvenliği test edilmelidir.

**9.3 Test Ortamı**

- Test ortamı üretim ortamına benzer olmalıdır.
- Test verileri gerçek verilerden ayrılmalıdır.
- Test ortamı izole edilmelidir.

**9.4 Hata Yönetimi**

- Tespit edilen hatalar kayıt altına alınmalıdır.
- Hatalar öncelik seviyelerine göre sınıflandırılmalıdır.
- Hata düzeltmeleri tekrar test edilmelidir.

**9.5 Kabul Kriterleri**

- Kritik hatalar giderilmeden sistem yayına alınmamalıdır.
- Tüm testler başarıyla tamamlanmalıdır.
- Fonksiyonel ve NFR gereksinimleri karşılanmalıdır.

**9.6 Test Dokümantasyonu**

- Test senaryoları yazılı olarak dokümante edilmelidir.
- Test sonuçları raporlanmalıdır.
- Kabul test raporları saklanmalıdır.

# 10\. DEPLOYMENT VE DEVOPS

**10.1 Ortamlar**

Sistem aşağıdaki ortamları desteklemelidir:

- **Geliştirme (Development)**
- **Test (Staging)**
- **Canlı (Production)**

Her ortam birbirinden izole olmalıdır.

**10.2 Versiyon Kontrolü**

- Tüm kaynak kodları versiyon kontrol sistemi üzerinde tutulmalıdır.
- Ana dallar (main / develop) belirlenmelidir.
- Kod değişiklikleri onay sürecinden geçmelidir.

**10.3 Sürekli Entegrasyon ve Sürekli Dağıtım (CI/CD)**

- Kod değişiklikleri otomatik olarak test edilmelidir.
- Testlerden geçen kodlar otomatik olarak dağıtıma hazırlanmalıdır.
- CI/CD süreci hataları erken aşamada tespit etmelidir.

**10.4 Dağıtım Süreci**

- Dağıtımlar otomatik veya yarı otomatik yapılmalıdır.
- Canlı ortamda minimum kesinti hedeflenmelidir.
- Geri dönüş (rollback) mekanizması bulunmalıdır.

**10.5 Konfigürasyon Yönetimi**

- Ortam değişkenleri güvenli şekilde yönetilmelidir.
- Gizli anahtarlar kaynak kodda tutulmamalıdır.
- Konfigürasyon değişiklikleri izlenebilir olmalıdır.

**10.6 İzleme ve Hata Yönetimi**

- Sistem performansı sürekli izlenmelidir.
- Hata ve istisnalar merkezi bir sistemde toplanmalıdır.
- Kritik hatalar için uyarı mekanizması bulunmalıdır.

**10.7 Yedekleme ve Kurtarma**

- Canlı ortam verileri düzenli olarak yedeklenmelidir.
- Felaket kurtarma planı oluşturulmalıdır.
- Yedeklerin geri yüklenebilirliği test edilmelidir.

**10.8 Kabul Kriterleri**

- Dağıtım süreci güvenli ve tekrarlanabilir olmalıdır.
- Sistem kesintisiz çalışmalıdır.
- Hatalar hızlı şekilde tespit edilmelidir.

# 11\. PROJE PLANI VE MİLESTONE'LAR

**11.1 Proje Yaklaşımı**

Proje, aşamalı (iteratif) yazılım geliştirme yaklaşımı ile yürütülecektir. Her aşamada belirli fonksiyonlar geliştirilip test edilecek, elde edilen geri bildirimler doğrultusunda iyileştirmeler yapılacaktır.

**11.2 Proje Aşamaları**

Proje aşağıdaki ana aşamalardan oluşmaktadır:

- Gereksinim Analizi
- Sistem Tasarımı
- Yazılım Geliştirme
- Test ve Doğrulama
- Dağıtım ve Yayına Alma
- Bakım ve İyileştirme

**11.3 Zaman Çizelgesi**

| **Aşama** | **Süre** |
| --- | --- |
| Gereksinim Analizi | 2 hafta |
| Sistem Tasarımı | 2 hafta |
| Yazılım Geliştirme | 8 hafta |
| Test Süreci | 3 hafta |
| Yayına Alma | 1 hafta |
| Toplam Süre | 16 hafta |

**11.4 Kilometre Taşları (Milestones)**

- Gereksinim dokümanının tamamlanması
- Temel kullanıcı modüllerinin geliştirilmesi
- İlan ve etkinlik modüllerinin tamamlanması
- Testlerin tamamlanması
- Canlıya geçiş

**11.5 Kaynak Planlaması**

- Yazılım geliştirici(ler)
- Test ve kalite sorumlusu
- Proje yöneticisi (opsiyonel)

**11.6 Riskler ve Önlemler (Özet)**

- Gecikmeler → Sprint bazlı ilerleme
- Teknik sorunlar → Yedek planlar
- Kullanıcı geri bildirimi eksikliği → Erken testler

**11.7 Kabul Kriterleri**

- Proje planlanan sürede tamamlanmalıdır.
- Tüm aşamalar belgelenmelidir.
- Kilometre taşları başarıyla geçilmelidir.

# 12\. RİSKLER VE ÖNLEMLER

**12.1 Teknik Riskler**

| **Risk** | **Açıklama** | **Önlem** |
| --- | --- | --- |
| Performans sorunları | Artan kullanıcı sayısında yavaşlama | Ölçeklenebilir mimari, performans testleri |
| Güvenlik açıkları | Yetkisiz erişim veya veri sızıntısı | OWASP önlemleri, güvenlik testleri |
| Entegrasyon hataları | Harici servis kesintileri | Hata toleranslı yapı, loglama |

**12.2 Operasyonel Riskler**

| **Risk** | **Açıklama** | **Önlem** |
| --- | --- | --- |
| Kullanıcı doğrulama sorunları | Mezun/öğrenci doğrulamasında gecikme | Manuel admin onayı opsiyonu |
| Veri kaybı | Sistem arızaları | Düzenli yedekleme |
| Moderasyon yetersizliği | Uygunsuz içerik artışı | Şikâyet ve moderasyon mekanizması |

**12.3 Proje Yönetimi Riskleri**

| **Risk** | **Açıklama** | **Önlem** |
| --- | --- | --- |
| Zaman planı sapmaları | Geliştirme süresinin uzaması | Sprint bazlı takip |
| Gereksinim değişikliği | Yeni talepler | Kapsam kontrolü |
| Kaynak eksikliği | İnsan kaynağı yetersizliği | Önceliklendirme |

**12.4 Kabul Kriterleri**

- Kritik riskler için önlemler tanımlanmış olmalıdır.
- Riskler proje süresince düzenli olarak gözden geçirilmelidir.

# 13\. KABUL KRİTERLERİ

**13.1 Genel Kabul Kriterleri**

- Tüm fonksiyonel gereksinimler eksiksiz çalışmalıdır.
- Fonksiyonel olmayan gereksinimler karşılanmalıdır.
- Sistem güvenli ve kararlı çalışmalıdır.
- Kullanıcı rolleri doğru şekilde yetkilendirilmelidir.

**13.2 Başarı Ölçütleri**

- Kullanıcı kayıt ve giriş işlemlerinin hatasız çalışması
- İlan ve etkinlik modüllerinin aktif kullanımı
- Bildirim ve mesajlaşma sisteminin sorunsuz çalışması
- Test senaryolarının %100 başarıyla tamamlanması
- KVKK ve veri gizliliği gereksinimlerine uyum

**13.3 Kullanıcı Kabulü**

- Kullanıcı kabul testleri başarıyla tamamlanmalıdır.
- Kullanıcı geri bildirimleri olumlu olmalıdır.
- Kritik hata bulunmamalıdır.

# 14\. EK KAYNAKLAR

**14.1 Doküman Versiyon Bilgileri**

| **Versiyon** | **Tarih** | **Açıklama** |
| --- | --- | --- |
| 1.0 | -   | İlk sürüm (03.12.2025) |

2.0 - İkinci Sürüm (21.12.2025)

**14.2 İlgili Standartlar ve Kaynaklar**

- IEEE 29148 - Software Requirements Specification
- OWASP Web Security Guidelines
- KVKK ve GDPR Mevzuatı
- WCAG 2.1 Erişilebilirlik Standartları

**14.3 Gelecekteki Geliştirmeler (Opsiyonel)**

- Mobil uygulama desteği
- Yapay zekâ destekli ilan önerileri
- Mezun-mentör eşleştirme sistemi
- Çoklu üniversite desteği