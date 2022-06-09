export class WfmEvent{
    constructor(
        public type: string, 
        public amount: number,  
        public category: number,
        public date: string,
        public description: string,
        public catName?: string,
        public id?: number
        
    ){}
}
