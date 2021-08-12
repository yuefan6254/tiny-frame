class Apromise {
    constructor(callback) {
        this.fulfillArr = [];
        this.rejectedArr = [];

        this.status = "pending";
        let reject = res => {
            if (this.status !== 'pending') return;

            let timer = setTimeout(() => {
                this.status = 'rejected';
                this.value = res;
                this.rejectedArr.forEach(item => item(res));
            }, 0);
        };

        let resolve = res => {
            if (this.status !== 'pending') return;

            let timer = setTimeout(() => {
                this.status = 'fulfilled';
                this.value = res;
                this.fulfillArr.forEach(item => item(res));
            },0)
        };

        try {
            callback(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(fulfilledCallBack, rejectedCallBack) {
        if (typeof fulfilledCallBack !== 'function') {
            fulfilledCallBack = res => res;
        }

        if (typeof rejectedCallBack !== 'function') {
            rejectedCallBack = res => {
                throw new Error(res instanceof Error ? res.message : res);
            }
        }

        return new Apromise((resolve, reject) => {
            this.fulfillArr.push(() => {
                try {
                    let x = fulfilledCallBack(this.value);

                    x instanceof Apromise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });

            this.rejectedArr.push(() => {
                try {
                    let y = rejectedCallBack(this.value);

                    y instanceof Apromise ? y.then(resolve, reject) : resolve(y);
                } catch (err) {
                    reject(err);
                }
            })
        });
    }

    catch(catchCallBack) {
        return this.then(null,catchCallBack);
    }
    finally(finallCallBack) {
        return this.then(finallCallBack,null);
    }

    static all(arr) {
        return new Apromise((resolve,reject) => {
            let index = 0;
            let res = [];
            for(let i=0;i<arr.length;i++){
                arr[i].then(val => {
                    index++;
                    res[i] = val;
                    if(index == arr.length){
                        resolve(res)
                    }
                },reject)
            }
        })
    }

    static race(arr) {
        let flag = false;
        return new Apromise((resolve,reject) => {
            arr.forEach(ifn => ifn.then(res =>{
                if(!flag){
                    flag = true;
                    resolve(res)
                }
            },err => {
                if(!flag){
                    flag = true;
                    reject(err)
                }
            }))
        })
    }

    static allSettled(arr) {
        let index=0;
        let result = [];

        return new Apromise((resolve,reject) => {
            for(let i=0;i<arr.length;i++){
                arr[i].then(res => {
                    index++;
                    result[i] =res;
                    
                    if(index == arr.length){
                        resolve(result)
                    }
                },err => {
                    index++;
                    result[i] =err;
                    
                    if(index == arr.length){
                        resolve(result)
                    }
                })
            }
        })
    }

    static any(arr) {
        let fulfilled = false;
        let index = 0;
        return new Apromise((resolve,reject) => {
            for(let i=0;i<arr.length;i++){
                arr[i].then(res => {
                    fulfilled = true;
                    resolve(res);
                },err => {
                    if(fulfilled) return;

                    index++;
                    if(index == arr.length){
                        reject(err)
                    }
                })
            }
        })
    }

    static resolve(arg) {
        if(arg instanceof Apromise ){
            return arg
        }

        return new Apromise((resolve,reject) => resolve(value))
    }

    static reject(value) {
        return new Apromise((resolve,reject) => reject(value))
    }

    static try(f) {
        (() => new Promise(resolve => resolve(f())))()
    }
}

module.exports = Apromise;

