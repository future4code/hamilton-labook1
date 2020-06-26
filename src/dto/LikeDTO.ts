export interface inputLikeDTO {
    user_id: string,
    post_id: string,
    vote_direction: likeDirection
};

export enum likeDirection{
    LIKE = '1',
    DISLIKE = '-1',
    REMOVE_VOTE = '0'
};