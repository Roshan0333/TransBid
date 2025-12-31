import {Server} from "socket.io";
import BidItem_Model from  "../../Model/Common/postItem.model.js";

const itemBidding = (server) => {
    const io = new Server(server, {
        cors:{
            origin:"*",
            methods:["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("🟢 Connected:", socket.id);

        socket.on("join_item_bid", async (bidItemId) =>{
            try{
                socket.join(bidItemId);

                const item = await BidItem_Model.findById(bidItemId);

                if(!item){
                    socket.emit("bid_error", "Item not found");
                    return
                }

                const currentPrice = item.EndPrice || item.StartPrice;

                socket.emit("current_bid", {
                    itemId: item._id,
                    currentPrice: currentPrice,
                    status: item.Status
                })
            }
            catch(err){
                socket.emit("bid_error", err.message)
            }
        });

        socket.on("place_item_bid", async ({bidItemId, bidAmount, bidderId}) => {
            try{
                const item = await BidItem_Model.findById(bidItemId);

                if(!item){
                    socket.emit("bid_error", "Item not found.");
                    return
                }

                if(item.Status !== "Live"){
                    socket.emit("bid_error", "Bidding not Active");
                    return;
                }

                let currentBidPrice = item.EndPrice || item.StartPrice;

                if(currentBidPrice <= bidAmount){
                    socket.emit("bid_error", "Bid must be less then current price");
                    return
                }

                item.EndPrice = bidAmount;
                item.BidderWinnerId = bidderId;
                await item.save()


                io.to(bidItemId).emit("bid_updated", {
                    itemId: bidItemId,
                    currentBidPrice: bidAmount,
                    bidderId
                });
            }
            catch(err){
                socket.emit("bid_error", err.message)
            }
        });

        socket.on("leave_item_bid", (bidItemId) => {
            socket.leave(bidItemId)
        });

        socket.on("disconnect", () => {
            console.log("🔴 Disconnected:", socket.id);
        });
    });

    return io;
}

export default itemBidding;