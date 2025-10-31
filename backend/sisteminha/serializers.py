from rest_framework import serializers
from django.db.models import Avg

from .models import Desenvolvedor, Microempreendedor, Avaliacao_Desenvolvedor, Avaliacao_Sistema, Categoria, Sistema, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'perfil', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user 

class DesenvolvedorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all()) ##referênciar meu user
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    avaliacao_media = serializers.SerializerMethodField()
    setores = serializers.SerializerMethodField()
    num_avaliacoes = serializers.SerializerMethodField()

    class Meta:
        model = Desenvolvedor
        fields = ['id', 'user', 'foto', 'descricao', 'cpf', 'github', 'num_avaliacoes', 'avaliacao_media', 'setores', 'user_first_name', 'user_last_name']

    
    def get_user(self, obj):
        return UserSerializer(obj.user).data    

    def get_num_avaliacoes(self, obj):
        avaliacoes = Avaliacao_Desenvolvedor.objects.filter(desenvolvedor=obj)
        if avaliacoes.exists():
            return avaliacoes.count()
        return 0

    def get_avaliacao_media(self, obj):
        avaliacoes = Avaliacao_Desenvolvedor.objects.filter(desenvolvedor=obj)
        if avaliacoes.exists():
            return int(avaliacoes.aggregate(Avg("estrela"))["estrela__avg"] or 0)
        return 0

    def get_setores(self, obj):
        return list(Sistema.objects.filter(desenvolvedor=obj).values_list("setor", flat=True))

class MicroempreendedorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all()) ##referênciar meu user
    class Meta:
        model = Microempreendedor
        fields = ['id', 'user', 'cnpj', 'foto', 'descricao']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_user(self, obj):
        return UserSerializer(obj.user).data

class Avaliacao_DesenvolvedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao_Desenvolvedor
        fields = '__all__'

class Avaliacao_SistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao_Sistema
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class SistemaSerializer(serializers.ModelSerializer):
    num_avaliacoes = serializers.SerializerMethodField()
    avaliacao_media = serializers.SerializerMethodField()

    desenvolvedor = DesenvolvedorSerializer(read_only=True)

    desenvolvedor_id = serializers.PrimaryKeyRelatedField(
        queryset=Desenvolvedor.objects.all(), write_only=True, source='desenvolvedor'
    )

    class Meta:
        model = Sistema
        fields = '__all__'  

    def get_num_avaliacoes(self, obj):
        return Avaliacao_Sistema.objects.filter(sistema=obj).count()

    def get_avaliacao_media(self, obj):
        avaliacoes = Avaliacao_Sistema.objects.filter(sistema=obj)
        if avaliacoes.exists():
            media = avaliacoes.aggregate(Avg("estrela"))["estrela__avg"] or 0
            return int(round(media))
        return 0