export class Post {
    
    public mapStringToType(value: string) {
        
        {value && (value = value.toLowerCase())};

        switch(value){
            case "normal": {
                return PostTypes.NORMAL
            };

            case "event": {
                return PostTypes.EVENT
            };

            default: {
                return PostTypes.NORMAL
            };
        };
    };
};

enum PostTypes {
    NORMAL =  "normal",
    EVENT = "event"
};