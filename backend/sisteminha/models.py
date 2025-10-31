from django.db import models
from django.db.models import Avg
from django.core.validators import MinValueValidator, MaxValueValidator
from django.forms import ValidationError
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token  

class User(AbstractUser):
    email = models.EmailField(unique=True)  

    PERFIL = (
        ('microempreendedor', 'Microempreendedor'),
        ('desenvolvedor', 'Desenvolvedor'),
    )
    perfil = models.CharField(max_length=17, choices=PERFIL)

    def __str__(self):
        return self.username  


class Microempreendedor(models.Model):
    cnpj = models.CharField(max_length=14, unique=True)
    descricao = models.TextField(default="Descrição está vazia.")
    foto = models.ImageField(upload_to='imgs/microempreendedores', default='imgs/avatar.png')
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True, related_name='microempreendedor')

    def __str__(self):
        return self.user.username  # Retorna o nome do usuário vinculado


class Desenvolvedor(models.Model):
    cpf = models.CharField(max_length=11, unique=True)
    foto = models.ImageField(upload_to='imgs/desenvolvedores', default='imgs/avatar.png')
    descricao = models.TextField(default="Descrição está vazia.")
    github = models.CharField(max_length=20)
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True, related_name='desenvolvedor')    

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"  # Retorna o nome do usuário vinculado


class Categoria(models.Model):
    nome = models.CharField(max_length=150)
    imagem = models.ImageField(upload_to='imgs/categorias')

    def __str__(self):
        return self.nome


class Sistema(models.Model):
    nome = models.CharField(max_length=250)
    setor = models.CharField(max_length=250)
    descricao = models.TextField()
    imagem = models.ImageField(upload_to='imgs/sistemas')
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    desenvolvedor = models.ForeignKey(Desenvolvedor, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=[
            ('concluido', 'Concluído'),
            ('em_andamento', 'Em Andamento'),
        ],
        null=True,
        blank=True
    )

    class Meta:
        unique_together = ("nome", "desenvolvedor") 

    def __str__(self):
        return self.nome


class Avaliacao_Sistema(models.Model):
    ESTRELA_CHOICES = [(i, str(i)) for i in range(1, 6)]
    estrela = models.IntegerField(choices=ESTRELA_CHOICES, validators=[MinValueValidator(1), MaxValueValidator(5)], null=False)
    comentario = models.TextField(null=True, blank=True)
    sistema = models.ForeignKey(Sistema, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def clean(self):
        if self.estrela not in dict(self.ESTRELA_CHOICES):
            raise ValidationError('A avaliação deve ser um número entre 1 e 5.')

    def __str__(self):
        return f'Avaliação de {self.usuario.username} para {self.sistema.nome}'


class Avaliacao_Desenvolvedor(models.Model):
    ESTRELA_CHOICES = [(i, str(i)) for i in range(1, 6)]
    estrela = models.IntegerField(choices=ESTRELA_CHOICES, validators=[MinValueValidator(1), MaxValueValidator(5)], null=False)
    comentario = models.TextField(null=True, blank=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    desenvolvedor = models.ForeignKey(Desenvolvedor, related_name="avaliacoes", on_delete=models.CASCADE)
    
    def clean(self):
        if self.estrela not in dict(self.ESTRELA_CHOICES):
            raise ValidationError('A avaliação deve ser um número entre 1 e 5.')

    def __str__(self):
        return f'Avaliação de {self.usuario.username} para {self.desenvolvedor.user.username}'
