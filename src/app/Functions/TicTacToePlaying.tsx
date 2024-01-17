export default function TicTacToePlaying(player:boolean){
  if(player){
    player = false;
    return 'X'
  }else if (!player){
    player = true;
    return 'O'
  }
}