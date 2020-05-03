/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.tablerows;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author FRANKLIN
 */
@ServerEndpoint(value="/tableroendpoint", 
        encoders={FigureEncoder.class},
        decoders={FigureDecoder.class })
public class TableroWS {
    
    private static final  Set<Session> peers=Collections.synchronizedSet(new HashSet<Session>());
    
    @OnMessage
    public void broadCastFigure(Figure figure, Session session)throws IOException, EncodeException {
        for (Session peer:peers) {
            if (!peer.equals(session)) {
                peer.getBasicRemote().sendObject(figure);
            }
        }
        
    }

    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
    }

    @OnError
    public void onError(Throwable t) {
    }

    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }
    
}
