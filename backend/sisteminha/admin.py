from django.contrib import admin
from .models import Desenvolvedor, Microempreendedor, Avaliacao_Desenvolvedor, Avaliacao_Sistema, Categoria, Sistema, User

admin.site.register(Desenvolvedor)
admin.site.register(Microempreendedor)
admin.site.register(Avaliacao_Desenvolvedor)
admin.site.register(Avaliacao_Sistema)
admin.site.register(Categoria)
admin.site.register(Sistema)
admin.site.register(User)