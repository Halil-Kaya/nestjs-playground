export const TryCatch = (errorHandler? : Function) : any => {


    return (target : any,propertyKey:string,descriptor:PropertyDescriptor) => {

        const orginalMethod = descriptor.value;

        descriptor.value = function(...args:any[]){

            try{

                const result = orginalMethod.apply(this,args);

                if(result && result instanceof Promise){

                    return result.catch((err:any) => {

                        if(errorHandler){
                            errorHandler(err)
                        }

                        throw err;

                    })

                }

            }catch(err){

                if(errorHandler){
                    errorHandler(err)
                }

                throw err;

            }

        }

        return descriptor;
    }

}