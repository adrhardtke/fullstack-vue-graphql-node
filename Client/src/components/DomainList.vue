<template>
  <div>
    
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">  
            <AppItemList title="Prefixos" :items="prefixes" v-on:addItem="addPrefix" v-on:deleteItem="deletePrefix" />
          </div>

          <div class="col-md"> 
            <AppItemList title="Sufixos" :items="sufixes" v-on:addItem="addSufix" v-on:deleteItem="deleteSufix" />
          </div>

        </div>
        <br/>
        <h5>Domínios <span class="badge badge-info">{{domains.length}}</span></h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="domain in domains" v-bind:key="domain.name">
                <div class="row">
                  <div class="col-md">
                    {{domain.name}}
                  </div>
                  <div class="col-md text-right">
                    <a class="btn btn-info" :href="domain.checkout" target="_blank">
                      <i class="fa fa-shopping-cart"></i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import axios from 'axios/dist/axios'
import AppItemList from "./components/AppItemList"

export default {
	name: "App",
	components: {
		AppItemList
	},
	data: function(){
		return {
			prefixes: [],
			sufixes: []
		}
	},
	methods: {
		addPrefix(prefix){
			axios({
				url: "http://localhost:4000",
				method: "post",
				data: {
					query: `
						mutation ($item: ItemInput){
							newPrefix: saveItem(item: $item) {
								id
								type
								description
							}
						}
					`,
					variables: {
						item: {
							type: "prefix",
							description: prefix
						}
					}
				}
			}).then(response => {
				const query = response.data
				const newPrefix = query.data.newPrefix
				this.prefixes.push(newPrefix.description)
			})	
		},
		addSufix(sufix){
			this.sufixes.push(sufix)
		},		
		deletePrefix(prefix){
			const index = this.prefixes.indexOf(prefix)
			this.prefixes.splice(index,1)
		},
		deleteSufix(sufix){
			const index = this.sufixes.indexOf(sufix)
			this.prefixes.splice(index,1)
		},		
		getPrefixes(){
			axios({
				url: "http://localhost:4000",
				methods: "post",
				data: {
					query: `
						{
							prefixes: items(type: "prefix") {
								id
								type
								description
							}							
						}
					`
				}
			}).then(response => {
				const query = response.data
				this.prefixes = query.data.prefixes
			})
		},
		getSufixes(){
			axios({
				url: "http://localhost:4000",
				methods: "post",
				data: {
					query: `
						{
							sufixes: items(type: "sufix") {
								id
								type
								description
							}
						}
					`
				}
			}).then(response => {
				const query = response.data
				this.sufixes = query.data.sufixes
			})
		}
	},
	computed: {
		//Computed properties, possuem watchers que só executarão novamente, quando as variaveis que ela depende, no casso
		// de domains, as variaveis são prefixes e sufixes, quando elas mudarem, o codigo domains() é executado
		domains(){
			console.log("Generating domains...")
			const domains = []
			for(const prefix of this.prefixes){
				for (const sufix of this.sufixes){
					const name = prefix + sufix
					const url = name.toLowerCase()
					const checkout = `http://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`
					domains.push({name, checkout})
				}
			}
			return domains
		}
	},
	created(){
		this.getPrefixes()
		this.getSufixes()
	}
}
</script>

<style>

</style>
