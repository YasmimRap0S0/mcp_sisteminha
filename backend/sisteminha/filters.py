import django_filters
from .models import *
from django.db.models import Q

class DesenvolvedorFilter(django_filters.FilterSet):
    pesquisa = django_filters.CharFilter(method='filter_by_keyword', label='Pesquisar')

    def filter_by_keyword(self, queryset, name, value):
        # Filtra em todos os campos especificados se a palavra-chave estiver presente em pelo menos um deles
        filter_condition = (
            Q(user__first_name__icontains=value) |
            Q(user__last_name__icontains=value) |
            Q(descricao__icontains=value)
        )
        return queryset.filter(filter_condition)

    class Meta:
        model = Desenvolvedor
        fields = ['pesquisa']

class SistemaFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr="icontains") # Busca parcial (case-insensitive)

    class Meta:
        model = Sistema
        fields = ['nome']