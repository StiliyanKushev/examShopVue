export default {
    methods:{
        $submit(url,callback,headers){
            this.$v.form.$touch();
    
            if(this.$v.form.$invalid){
                //vue notify errors
                let errors = [];

                for(let input in this.$v.form){
                    if(input == "$model") break;
                    for(let key in this.$v.form[input]){
                        if(key == "$model") break;
                        if(!this.$v.form[input][key]){
                            errors.push(`${this.errors[input][key]}`);
                        }
                    }
                }
    
                for(let err of errors) this.$vToastify.error({title:" ", body: err });
            }
            else{
                this.$http.post(url,this.form,{headers})
                .then((res) => {
                    if(!res.data.success){
                        this.$vToastify.error({title:" ", body: res.data.message });
                    }
                    else{
                        this.$vToastify.success({title:" ", body: res.data.message });
                        callback(res);
                    }
                });
            }
        }
    }
}