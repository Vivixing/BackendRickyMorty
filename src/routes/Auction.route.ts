import * as express from "express";
import { AuctionController } from "../controllers/Auction.controller";

const router = express.Router();
const auctionController = new AuctionController();

router.get(
    "/Auction/creator/:user",
    auctionController.getByCreator
);

router.get(
    "/Auction/acquirer/:user",
    auctionController.getByAcquirer
);

router.get(
    "/Auction/completed/:completed",
    auctionController.getByCompleted
);

router.get(
    "/Auction/:id",
    auctionController.getByIdAuction
);

router.get(
    "/Auction",
    auctionController.getAllAuctions
);

router.post(
    "/Auction",
    auctionController.saveAuction
);

router.put(
    "/Auction",
    auctionController.updateAuction
);

router.delete(
    "/Auction/:id",
    auctionController.deleteAuction
);

router.post(
    "/Auction/exchange",
    auctionController.exchangeCharacters
);

export { router as auctionRouter };


