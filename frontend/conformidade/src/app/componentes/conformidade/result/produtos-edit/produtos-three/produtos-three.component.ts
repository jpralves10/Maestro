import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from '../../../models/produto.model';
import { Atributos, CodigoInterno } from '../../../models/legendas.model';

import { FilterResult } from '../../../models/filter-result.model';
import { ConsultaService } from '../../../services/consulta.service';

import paises from '../../../../utilitarios/pais-origem.model';
import { msg_produtos_three } from '../../../../utilitarios/mensagens.module';

import * as DateManagement from '../../../../utilitarios/date-management';

@Component({
    selector: 'app-produtos-three',
    templateUrl: './produtos-three.component.html',
    styleUrls: ['./produtos-three.component.scss']
})
export class ProdutosThreeComponent implements OnInit {

    @Input() produto: Produto;
    @Output() produtoAlterado = new EventEmitter();

    public loading = true;
    public errored = false;
    public finish = false;
    public spinner = false;

    paises: Array<{ value: string; viewValue: string; }> = [];

    mensagem: any = {id: 0, tipo: '', class: '', lista: []};

    atributoDataSource = new MatTableDataSource<Atributos>();
    codigoInternoDataSource = new MatTableDataSource<CodigoInterno>();

    public situacoes = [
        {value: 'ATIVADO', viewValue: 'Ativado'},
        {value: 'DESATIVADO', viewValue: 'Desativado'},
        {value: 'RASCUNHO', viewValue: 'Rascunho'}
    ];

    public modalidades = [
        {value: 'AMBOS', viewValue: 'Ambos'},
        {value: 'EXPORTACAO', viewValue: 'Exportação'},
        {value: 'IMPORTACAO', viewValue: 'Importação'}
    ];

    public fabricantes = [
        {value: 'FALSE', viewValue: 'Não'},
        {value: 'TRUE', viewValue: 'Sim'}
    ];

    atributosColumns: string[] = ['atributo', 'valor', 'operacao'];
    atributo_form: Atributos = {atributo: '', valor: ''};

    codigoInternoColumns: string[] = ['valor', 'operacao'];
    codigointerno_form: CodigoInterno = {valor: ''};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private consultaService: ConsultaService
    ) { 
        this.paises = paises;
    }

    ngOnInit() {
        this.loading = false;
        this.initDatasSources();
    }

    private initDatasSources(){
        if(this.produto.atributos == null){
            this.produto.atributos = [];
            this.atributoDataSource.data = [];
        }else{
            this.atributoDataSource.data = [...this.produto.atributos];
        }

        if(this.produto.codigosInterno == null){
            this.produto.codigosInterno = [];
            this.codigoInternoDataSource.data = [];
        }else{
            this.codigoInternoDataSource.data = [...this.produto.codigosInterno];
        }
    }

    public adicionarAtributo(){
        this.produto.atributos.push(this.atributo_form)
        this.atributo_form = {atributo: '', valor: ''};
        this.updateAtributos();
    }

    public removeRowAtributo(row: Atributos){
        this.produto.atributos.splice(this.produto.atributos.indexOf(row), 1);
        this.updateAtributos();
    }

    public updateAtributos(){
        this.atributoDataSource.data = [...this.produto.atributos];
    }

    public adicionarCodigoInterno(){
        this.produto.codigosInterno.push(this.codigointerno_form)
        this.codigointerno_form = {valor: ''};
        this.updateCodigoInterno();
    }

    public removeRowCodigoInterno(row: CodigoInterno){
        this.produto.codigosInterno.splice(this.produto.codigosInterno.indexOf(row), 1);
        this.updateCodigoInterno();
    }

    public updateCodigoInterno(){
        this.codigoInternoDataSource.data = [...this.produto.codigosInterno];
    }

    public finalizarPreenchimento(){

        this.spinner = true;

        setTimeout(() => {
            this.validarCampos();
            this.spinner = false;

            if(this.mensagem.lista.length == 0){

                this.mensagem = null;
                this.setMensagem('message-alert-success');

                if(this.mensagem != null){

                    this.mensagem.lista = [];
                    this.mensagem.lista.push({chave: 0, valor: 'Mercadoria cadastrada com sucesso!'});

                    this.finish = true;
                
                    setTimeout(() => {
                        this.finish = false;
                        this.mensagem = null;

                        this.produto.status = 'Completo';
                        this.produto.dataCriacao = DateManagement.UTCTimeZoneString(new Date());
                        this.produto.dataAtualizacao = DateManagement.UTCTimeZoneString(new Date());
                        this.produto.versoesProduto = undefined;
                        this.produto.etapaConformidade = undefined;

                        if(this.produto.atributos.length <= 0){
                            this.produto.atributos = undefined;
                        }

                        this.produtoAlterado.emit(this.produto);

                        this.consultaService
                            .setAlterarProdutos(this.produto)
                            .subscribe(versoes => {}, error => { this.errored = true;});
                        
                        this.router.navigate([`./result`], {
                            relativeTo: this.route,
                            replaceUrl: true,
                            queryParams: {
                                filter: this.getFilterAsString()
                            }
                        });

                    }, 2000);
                }                
            }
        }, 500);
    }

    public validarCampos(){

        this.setMensagem('message-alert-warning');

        if(this.mensagem != null){

            this.mensagem.lista = [];

            if(this.isNullUndefined(this.produto.seq)){
                this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'Sequência\'.'});
            }else if(this.produto.seq.length <= 0 || this.produto.seq.length > 3){
                this.mensagem.lista.push({chave: 0, valor: 'Tamanho do campo \'Sequência\': de 1 a 3 caracteres.'});
            }
            
            if(this.isNullUndefined(this.produto.descricao)){
                this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'Descrição do Produto\'.'});
            }else if(this.produto.descricao.length <= 0 || this.produto.descricao.length > 3700){
                this.mensagem.lista.push({chave: 0, valor: 'Tamanho do campo \'Descrição do Produto\': de 1 até 3700 caracteres.'});
            }

            if(this.isNullUndefined(this.produto.situacao) || !this.inListObject(this.situacoes, this.produto.situacao)){
                this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'Situação do Produto\'.'});
            }

            if(this.isNullUndefined(this.produto.modalidade) || !this.inListObject(this.modalidades, this.produto.modalidade)){
                this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'Modalidade do Produto\'.'})
            }

            if(this.isNullUndefined(this.produto.ncm)){
                this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'NCM do Produto\'.'})
            }else if(this.produto.ncm.length <= 0 || this.produto.ncm.length > 8){
                this.mensagem.lista.push({chave: 0, valor: 'Tamanho do campo \'NCM do Produto\': de 1 a 8 caracteres.'})
            }

            if(this.isNullUndefined(this.produto.fabricanteConhecido) || !this.inListObject(this.fabricantes, this.produto.fabricanteConhecido)){
                this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'Fabricante Conhecido\'.'})
            }

            if(this.isNullUndefined(this.produto.paisOrigem) || !this.inListObject(this.paises, this.produto.paisOrigem)){
                this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'País de Origem\'.'})
            }

            if((!this.isNullUndefined(this.produto.fabricanteConhecido) && this.produto.fabricanteConhecido == 'TRUE') &&
                (!this.isNullUndefined(this.produto.paisOrigem) && this.produto.paisOrigem == 'BR')){
                if(this.isNullUndefined(this.produto.cpfCnpjFabricante)){
                    this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'CPF/CNPJ do Fabricante\'.'})
                }else if(this.produto.cpfCnpjFabricante.length <= 0 || this.produto.cpfCnpjFabricante.length > 14){
                    this.mensagem.lista.push({chave: 0, valor: 'Tamanho do campo \'CPF/CNPJ do Fabricante\': de 1 a 14 caracteres.'})
                }
            }

            if((!this.isNullUndefined(this.produto.fabricanteConhecido) && this.produto.fabricanteConhecido == 'TRUE') &&
                (!this.isNullUndefined(this.produto.paisOrigem) && this.produto.paisOrigem != 'BR')){
                if(this.isNullUndefined(this.produto.codigoOperadorEstrangeiro)){
                    this.mensagem.lista.push({chave: 0, valor: 'Verificar preenchimento do campo \'Código Operador Estrangeiro\'.'})
                }else if(this.produto.codigoOperadorEstrangeiro.length <= 0 || this.produto.codigoOperadorEstrangeiro.length > 35){
                    this.mensagem.lista.push({chave: 0, valor: 'Tamanho do campo \'Código Operador Estrangeiro\': de 1 a 35 caracteres.'})
                }
            }
        }
    }

    public setMensagem(tpMensagem: string) {
        this.mensagem = null;
        for(let msg of msg_produtos_three) {
            if(msg.tipo == tpMensagem){
                this.mensagem = msg;
            }
        }
    }

    public isNullUndefined(objeto: any): boolean {
        return objeto == null || objeto == undefined ? true : false;
    }

    public inListObject(list: {value: string, viewValue: string}[], stringValue: string): boolean {
        for(let item of list){
            if(item.value == stringValue){
                return true;
            }
        }
        return false;
    }

    public getFilterAsString(): string {
        return JSON.stringify({
            importers: [this.produto.cnpjRaiz],
            start_date: '',
            end_date: ''
        } as FilterResult);
    }

    public voltarEtapa() {
        this.produto.etapaConformidade--;
        this.produtoAlterado.emit(this.produto);
    }
}