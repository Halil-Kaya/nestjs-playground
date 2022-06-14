export function checkResult<T>(data:T,message:string){
    if(!data){
        throw new Error(message)
    }
}