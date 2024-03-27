

const MAX_DEPOSIT_DAY = 150000
const MAX_DEPOSIT_TRANSACTION = 40000
const MAX_DEPOSIT_FREQUENCY = 4

const MAX_WITHDRAWAL_DAY = 50000
const MAX_WITHDRAWAL_TRANSACTION = 20000
const MAX_WITHDRAWAL_FREQUENCY = 3


export class BankType {

    /**
     * @param {number} balance 
     */

    constructor(balance) {
        this.balance = balance
        this.depositAmountDays = [0, 0, 0 ,0]
        this.withdrawalAmountDays = [0, 0, 0]
        this.error = null

    }

   
    
    /**
     * @param {number} amount 
     * @return {number} balance
     */

      deposit(amount) {

        this.error = null

        // Check if deposit amount per transaction is exceeded
         if (amount <= MAX_DEPOSIT_TRANSACTION ) {

             // Check if number of transactions is exceeded per day
            if(this.depositAmountDays.length < MAX_DEPOSIT_FREQUENCY ){
                this.depositAmountDays.push(amount)
             } else {
                // throw max day deposit frequency Exeception
                this.error = "You have exceeded the maximum number of deposit transaction per day"
             }

              // Check if deposit for the day is exceeded
              if (this.depositAmountDays.length > 0 && this.getTotalTransactionAmount(this.depositAmountDays) <= MAX_DEPOSIT_DAY) {
                    this.balance += amount
              } else {
                // throw max deposit amount for the day Exeception
                this.error = "You have exceeded the maximum deposit amount for the day"

              }

             
             
         } else {
            // throw eposit amount per transaction is exceeded exception
            this.error = "You have exceeded the maximum deposit amount"
         }

         return this.balance
        }

     /**
     * @param {number} amount 
     * @return {number} balance
     */

      withdraw(amount) {

        this.error = null


        // Check if the amount exceeds the balance
        if(amount < this.balance) {

        // Check if withdrawal amount per transaction is exceeded
        if (amount <= MAX_WITHDRAWAL_TRANSACTION ) {

            // Check if number of transactions is exceeded per day
           if(this.withdrawalAmountDays.length < MAX_WITHDRAWAL_FREQUENCY){
               this.withdrawalAmountDays.push(amount)
            } else {
               // throw max day withdrawal frequency Exeception
               this.error = "You have exceeded the maximum number of withdrawals per day"
            }

             // Check if cumilative withdrawal amount for the day is exceeded
             if (this.withdrawalAmountDays.length > 0 &this.getTotalTransactionAmount(this.withdrawalAmountDays) <= MAX_WITHDRAWAL_DAY) {
                   this.balance -= amount
             } else {
               // throw max deposit amount for the day Exeception
               this.error = "You have exceeded the maximum withdrawal amount for the day"

             }

            
            
        } else {
            // throw  withdrawal amount per transaction is exceeded exception
            this.error = "You have execeed the maximum allowed withdrawal amount"
        }
         
    } else {
        // throw the amount exceeds balance exception
        this.error = "Your balance is insufficient"
    }

    return this.balance
        
    }

    /**
     * @param {Array<number>} depositsDay
     * @return {number} 
     */

     getTotalTransactionAmount(depositsDay) {
        return depositsDay.reduce((pv, cv) => {
            return pv + cv
        })
    }
    

}


/**
 * @return {Object.<BankType>}
 */

 const Bank = (function () {
    let instance;
  
     function createInstance() {
 
      return new BankType(0)
    }  

    return {
      instance: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      },
    };
  })();


export default Bank