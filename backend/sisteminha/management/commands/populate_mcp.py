from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from sisteminha.models import (
    Desenvolvedor, Sistema, Categoria,
    Avaliacao_Desenvolvedor, Avaliacao_Sistema, Microempreendedor
)
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image
import re
import uuid

User = get_user_model()

def criar_imagem(nome_arquivo, color=(200, 200, 200)):
    img = Image.new('RGB', (200, 200), color=color)
    img_io = BytesIO()
    img.save(img_io, format='PNG')
    return ContentFile(img_io.getvalue(), name=nome_arquivo)


def safe_username(value: str) -> str:
    if not value:
        return f'user_{uuid.uuid4().hex[:8]}'
    v = value.strip().lower()
    v = re.sub(r"\s+", "_", v)
    v = re.sub(r'[^a-z0-9_@.+-]', '', v)
    if not v:
        return f'user_{uuid.uuid4().hex[:8]}'
    return v


class Command(BaseCommand):
    help = 'Popula o banco de dados com dados de teste para o MCP (safe, idempotente e transacional)'

    def handle(self, *args, **options):
        self.stdout.write('Iniciando população do banco (populate_mcp)...')

        categorias = {}

        with transaction.atomic():
            # Criar categorias padrão
            self.stdout.write('Criando categorias...')
            categorias['alimentacao'], _ = Categoria.objects.get_or_create(
                nome='Setor de Alimentação',
                defaults={'imagem': criar_imagem('categoria_alimentacao.png')}
            )
            categorias['beleza_estetica'], _ = Categoria.objects.get_or_create(
                nome='Setor de Beleza e Estética',
                defaults={'imagem': criar_imagem('categoria_beleza_estetica.png')}
            )
            categorias['servicos'], _ = Categoria.objects.get_or_create(
                nome='Setor de Serviços',
                defaults={'imagem': criar_imagem('categoria_servicos.png')}
            )
            categorias['vendas_online'], _ = Categoria.objects.get_or_create(
                nome='Setor de Vendas',
                defaults={'imagem': criar_imagem('categoria_vendas_online.png')}
            )

            # Desenvolvedores com descrições claras
            desenvolvedores_data = [
                {
                    'username': 'carlos_silva',
                    'email': 'carlos.silva@email.com',
                    'first_name': 'Carlos',
                    'last_name': 'Silva',
                    'cpf': '11111111111',
                    'github': 'carlosdev',
                    'descricao': 'Desenvolvedor fullstack especializado em Python, Django e Flask para sistemas de gestão. Trabalho com Mobile também',
                    'setores': ['Serviços'],
                    'avaliacoes': [5, 5, 5, 5, 5],
                },
                {
                    'username': 'ana_santos',
                    'email': 'ana.santos@email.com',
                    'first_name': 'Ana',
                    'last_name': 'Santos',
                    'cpf': '22222222222',
                    'github': 'anadev',
                    'descricao': 'Frontend especialista em React e JavaScript, com foco em sistemas de alimentação e delivery.',
                    'setores': ['Alimentação'],
                    'avaliacoes': [5, 5, 5, 5],
                },
                {
                    'username': 'yasmim_raposo',
                    'email': 'yasmim.raposo@email.com',
                    'first_name': 'Yasmim',
                    'last_name': 'Raposo',
                    'cpf': '33333333333',
                    'github': 'YasmimRap0S0',
                    'descricao': 'Desenvolvedora backend para e-commerce e plataformas de vendas online, com experiência em Python e web.',
                    'setores': ['Serviços'],
                    'avaliacoes': [4, 4, 4, 4],
                },
                {
                    'username': 'maria_costa',
                    'email': 'maria.costa@email.com',
                    'first_name': 'Maria',
                    'last_name': 'Costa',
                    'cpf': '44444444444',
                    'github': 'mariadev',
                    'descricao': 'Frontend especializada em React e JavaScript, criando sistemas para salões e clínicas de beleza.',
                    'setores': ['Beleza e Estética'],
                    'avaliacoes': [3, 3, 3, 3],
                },
                {
                    'username': 'pedro_almeida',
                    'email': 'pedro.almeida@email.com',
                    'first_name': 'Pedro',
                    'last_name': 'Almeida',
                    'cpf': '55555555555',
                    'github': 'pedrodev',
                    'descricao': 'Backend com foco em Python, Clojure e Go, aplicando arquiteturas modernas de microserviços.',
                    'setores': ['Serviços'],
                    'avaliacoes': [],
                },
                {
                    'username': 'joao_pereira',
                    'email': 'joao.pereira@email.com',
                    'first_name': 'João',
                    'last_name': 'Pereira',
                    'cpf': '66666666666',
                    'github': 'joaodbadmin',
                    'descricao': 'Backend especializado em administração de sistemas e banco de dados.',
                    'setores': ['Serviços'],
                    'avaliacoes': [],
                },
            ]

            # Criar usuários avaliadores
            self.stdout.write('Criando usuários avaliadores...')
            usuarios_avaliadores = []
            for i in range(1, 6):
                uname = safe_username(f'avaliador_{i}')
                user_aval, _ = User.objects.get_or_create(
                    username=uname,
                    defaults={
                        'email': f'avaliador{i}@email.com',
                        'first_name': 'Avaliador',
                        'last_name': str(i),
                        'perfil': 'microempreendedor',
                    }
                )
                user_aval.set_password('senha123')
                user_aval.save()
                usuarios_avaliadores.append(user_aval)

            desenvolvedores = []

            # Criar desenvolvedores e objetos relacionados
            self.stdout.write('Criando desenvolvedores...')
            for dev_data in desenvolvedores_data:
                email = dev_data.get('email', '')
                user = None
                if email:
                    user = User.objects.filter(email=email).first()
                if not user:
                    uname = safe_username(dev_data.get('username') or email)
                    user, _ = User.objects.get_or_create(
                        username=uname,
                        defaults={
                            'email': email,
                            'first_name': dev_data.get('first_name', ''),
                            'last_name': dev_data.get('last_name', ''),
                            'perfil': 'desenvolvedor',
                        }
                    )
                else:
                    if getattr(user, 'perfil', '') != 'desenvolvedor':
                        user.perfil = 'desenvolvedor'
                user.set_password('senha123')
                user.save()

                dev, _ = Desenvolvedor.objects.get_or_create(
                    cpf=dev_data['cpf'],
                    defaults={
                        'user': user,
                        'github': dev_data.get('github', ''),
                        'descricao': dev_data.get('descricao', ''),
                    }
                )

                if not dev.foto or not getattr(dev.foto, 'name', None):
                    img_name = f"dev_{dev.cpf}_avatar.png"
                    dev.foto.save(img_name, criar_imagem(img_name), save=True)

                desenvolvedores.append((dev, dev_data))

            # Criar avaliações para desenvolvedores
            self.stdout.write('Criando avaliações de desenvolvedores...')
            avaliador_idx = 0
            for dev, dev_data in desenvolvedores:
                for nota in dev_data.get('avaliacoes', []):
                    Avaliacao_Desenvolvedor.objects.get_or_create(
                        desenvolvedor=dev,
                        usuario=usuarios_avaliadores[avaliador_idx % len(usuarios_avaliadores)],
                        defaults={
                            'estrela': nota,
                            'comentario': f'Avaliação {nota} estrelas para {dev.user.first_name}',
                        }
                    )
                    avaliador_idx += 1

            # Mapear devs por nome para facilitar vínculo nos sistemas
            dev_by_name = {d.user.first_name + ' ' + d.user.last_name: d for d, _ in desenvolvedores}

            # Criar sistemas claros e coerentes
            self.stdout.write('Criando sistemas de exemplo...')
            sistemas_data = [
                {
                    'nome': 'BeautyHair',
                    'setor': 'Beleza e Estética',
                    'descricao': 'Plataforma para gestão de salões de beleza e agendamento de clientes.',
                    'categoria': categorias['beleza_estetica'],
                    'desenvolvedor': dev_by_name.get('Maria Costa'),
                    'status': 'concluido',
                    'avaliacoes': [5, 4, 4, 5],
                },
                {
                    'nome': 'iLanches',
                    'setor': 'Alimentação',
                    'descricao': 'Sistema para gestão de lanchonetes e food trucks, com pedidos online e cardápio digital.',
                    'categoria': categorias['alimentacao'],
                    'desenvolvedor': dev_by_name.get('Ana Santos'),
                    'status': 'concluido',
                    'avaliacoes': [5, 5, 5, 5],
                },
                {
                    'nome': 'GestorFood',
                    'setor': 'Alimentação',
                    'descricao': 'Gestão de restaurantes e pizzarias: mesas, pedidos e pagamentos.',
                    'categoria': categorias['alimentacao'],
                    'desenvolvedor': dev_by_name.get('Ana Santos'),
                    'status': 'concluido',
                    'avaliacoes': [4, 4, 4, 4],
                },
                {
                    'nome': 'ServiPlus',
                    'setor': 'Serviços',
                    'descricao': 'Gestão para prestadores de serviços: agenda, clientes e pagamentos.',
                    'categoria': categorias['servicos'],
                    'desenvolvedor': dev_by_name.get('Carlos Silva'),
                    'status': 'concluido',
                    'avaliacoes': [3, 3, 3, 3],
                },
                {
                    'nome': 'Sisteminha',
                    'setor': 'Serviços',
                    'descricao': 'Sistema simples para microempreendedores gerenciarem seus serviços e clientes.',
                    'categoria': categorias['servicos'],
                    'desenvolvedor': dev_by_name.get('Yasmim Raposo'),
                    'status': 'concluido',
                    'avaliacoes': [5, 5, 5, 5],
                },
                {
                    'nome': 'GestorPro',
                    'setor': 'Serviços',
                    'descricao': 'Sistema de gestão empresarial com foco em relatórios e controle financeiro.',
                    'categoria': categorias['servicos'],
                    'desenvolvedor': dev_by_name.get('Pedro Almeida'),
                    'status': 'em andamento',
                    'avaliacoes': [],
                },
                {
                    'nome': 'DBManager',
                    'setor': 'Serviços',
                    'descricao': 'Ferramenta para administração de bancos de dados e monitoramento de sistemas.',
                    'categoria': categorias['servicos'],
                    'desenvolvedor': dev_by_name.get('João Pereira'),
                    'status': 'concluido',
                    'avaliacoes': [5, 4, 5],
                },
            ]

            sistemas = []
            for sdata in sistemas_data:
                dev_ref = sdata['desenvolvedor']
                if not dev_ref:
                    self.stdout.write(self.style.WARNING(f"Desenvolvedor não encontrado para sistema: {sdata['nome']}"))
                    continue

                sistema, created = Sistema.objects.get_or_create(
                    nome=sdata['nome'],
                    desenvolvedor=dev_ref,
                    defaults={
                        'setor': sdata.get('setor', ''),
                        'descricao': sdata.get('descricao', ''),
                        'categoria': sdata.get('categoria'),
                        'status': sdata.get('status', ''),
                    }
                )
                if not created:
                    updated = False
                    for fld in ('setor', 'descricao', 'categoria', 'status'):
                        if getattr(sistema, fld) != sdata.get(fld):
                            setattr(sistema, fld, sdata.get(fld))
                            updated = True
                    if updated:
                        sistema.save()

                if not sistema.imagem or not getattr(sistema.imagem, 'name', None):
                    safe = re.sub(r'[^a-z0-9]+', '_', sdata['nome'].lower())[:30]
                    img_name = f"sys_{safe}.png"
                    sistema.imagem.save(img_name, criar_imagem(img_name, color=(180, 180, 220)), save=True)

                sistemas.append((sistema, sdata))

            # Criar avaliações para sistemas
            self.stdout.write('Criando avaliações de sistemas...')
            avaliador_idx = 0
            for sistema, sdata in sistemas:
                # Deletar avaliações existentes para garantir consistência
                Avaliacao_Sistema.objects.filter(sistema=sistema).delete()
                for nota in sdata.get('avaliacoes', []):
                    Avaliacao_Sistema.objects.create(
                        sistema=sistema,
                        usuario=usuarios_avaliadores[avaliador_idx % len(usuarios_avaliadores)],
                        estrela=nota,
                        comentario=f'Avaliação {nota} estrelas para {sistema.nome}'
                    )
                    avaliador_idx += 1

            self.stdout.write(self.style.SUCCESS('Banco de dados populado com sucesso (populate_mcp).'))
            self.stdout.write('\nResumo rápido:')
            self.stdout.write(f' - {len(desenvolvedores)} desenvolvedores processados')
            self.stdout.write(f' - {len(sistemas)} sistemas processados')
            self.stdout.write(f' - {len(categorias)} categorias presentes')
            self.stdout.write(f' - {len(usuarios_avaliadores)} usuários avaliadores criados')
