<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>NameGator <i class="fa fa-check"></i> </h1>
      <h6 class="text-secondary">Gerador de nomes</h6>
      <a href="https://www.youtube.com/watch?v=TSX_hMfL13U&t=666s">Link no Youtube (Rodrigo Branas)</a>
    </div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">  
            <h5>Prefixos <span class="badge badge-info">{{prefixes.length}}</span></h5>        
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="prefix in prefixes" v-bind:key="prefix">
                    <div class="row">
                      <div class="col-md">
                        {{prefix}}                        
                      </div>
                      <div class="col-md text-right">
                        <button class="btn btn-info" v-on:click="deletePrefix(prefix)">
                          <i class="fa fa-trash"></i>
                        </button>     
                      </div>
                    </div>
                  </li>
                </ul>
                <br/>
                <div class="input-group">
                  <input class="form-control" v-model="prefix" v-on:keyup.enter="addPrefix(prefix)" type="text" placeholder="Digite o prefixo" />
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addPrefix(prefix)">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md"> 
            <h5>Sufixos <span class="badge badge-info">{{sufixes.length}}</span></h5> 
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="sufix in sufixes" v-bind:key="sufix">
                    <div class="row">
                      <div class="col-md">
                        {{sufix}}                        
                      </div>
                      <div class="col-md text-right">
                        <button class="btn btn-info" v-on:click="deleteSufix(sufix)">
                          <i class="fa fa-trash"></i>
                        </button>     
                      </div>
                    </div>
                  </li>
                </ul>
                <br/>
                <div class="input-group">
                  <input class="form-control" v-model="sufix" v-on:keyup.enter="addSufix(prefix)" type="text" placeholder="Digite o sufixo" />
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addSufix(sufix)">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

export default {
	name: "App",
	data: function(){
		return {
			prefix: "",
			sufix: "",
			prefixes: ["Air", "Jet", "Flight"],
			sufixes: ["Hub", "Station", "Mart"]
		}
	},
	methods: {
		addPrefix(prefix){
			this.prefixes.push(prefix)
			this.prefix = ""
		},
		addSufix(sufix){
			this.sufixes.push(sufix)
			this.sufix = ""
		},		
		deletePrefix(prefix){
			const index = this.prefixes.indexOf(prefix)
			this.prefixes.splice(index,1)
		},
		deleteSufix(sufix){
			const index = this.sufixes.indexOf(sufix)
			this.prefixes.splice(index,1)
		},		
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
	}
}
</script>

<style>

  #slogan {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  #main {
    background: #f1f1f1;
    padding-top: 30px;
    padding-bottom: 30px;
  }

</style>
