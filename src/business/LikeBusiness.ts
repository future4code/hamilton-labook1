import { LikeDatabase } from '../data/LikeDatabase';
import { inputLikeDTO, likeDirection } from '../dto/LikeDTO';
import { failureMessage } from '../messages';

export class LikeBusiness {
    public async votePost(body: inputLikeDTO){
        
        const convertVoteDirection = this.convertVoteDirection(body.vote_direction);
        
        if(convertVoteDirection === likeDirection.REMOVE_VOTE){
            return await new LikeDatabase().deleteVoteRow(body);
        };
        
        const checkLike = await new LikeDatabase().checkLike(body.post_id, body.user_id);

        if(checkLike){
    
            const alterVote = await new LikeDatabase().alterVote(body);
            return alterVote;
        
        }else{
            
            const insertVote = await new LikeDatabase().insertVote(body);
            return insertVote;
        
        };
    };

    public convertVoteDirection(voteDirection: string){

        switch(voteDirection){
            case "1": {
                return likeDirection.LIKE;
            };

            case "-1": {
                return likeDirection.DISLIKE;
            };

            case "0": {
                return likeDirection.REMOVE_VOTE;
            };

            default: {
                throw new Error(failureMessage.voteDirection);
            }
        };
    };
};