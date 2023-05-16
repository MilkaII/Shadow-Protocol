# Do not change the order or names of states 
#(the code is assuming specific IDs and names)
# You can add more in the end
insert into game_state (gst_state) values ('Waiting');
insert into game_state (gst_state) values ('Started');
insert into game_state (gst_state) values ('Finished');
insert into game_state (gst_state) values ('Canceled');
insert into game_state (gst_state) values ('Choose Deck');
insert into game_state (gst_state) values ('Ready');

# Do not change the order, but you can add more in the end
insert into user_game_state (ugst_state) values ('Waiting');
insert into user_game_state (ugst_state) values ('Playing');
insert into user_game_state (ugst_state) values ('Score');
insert into user_game_state (ugst_state) values ('End');
insert into user_game_state (ugst_state) values ('Choose Deck');
insert into user_game_state (ugst_state) values ('Ready');

# Possible end game states
insert into scoreboard_state (sbs_state) values ('Tied');
insert into scoreboard_state (sbs_state) values ('Lost');
insert into scoreboard_state (sbs_state) values ('Won');

insert into card_type (ct_name) values ('Chief'),('Member'),('High Ranking Member'),('Hacks');

insert into card_hack_type (cht_name) values ('Give Health'),('Give Damage');

insert into card_state (crd_state) values ('In deck');
insert into card_state (crd_state) values ('In hand');
insert into card_state (crd_state) values ('In Bench');
insert into card_state (crd_state) values ('In Board');
insert into card_state (crd_state) values ('Killed');

insert into card (crd_id, crd_cost, crd_damage, crd_health, crd_bonus, crd_name, crd_gang, crd_info, crd_hack_type_id, crd_type_id) values 
   (1, 5, 5, 25, null, "Cipher","Neon Syndicate", null, null, 1),
   (2, 2, 9, 6, null, "Armitager", "Neon Syndicate", null, null, 3),
   (3, 2, 1, 12, null, "Gunnar","Neon Syndicate", null, null, 2),
   (4, 2, 2, 1, null, "Rezin","Neon Syndicate", null, null, 2),
   (5, 2, 0, 0, 3, "Maxine","Neon Syndicate", "Give +3 damage to a unit", 2, 4),
   (6, 5, 5, 25, null, "Makko","Data Devils", null, null, 1),
   (7, 2, 9, 6, null, "Erythrina", "Data Devils", null, null, 3),
   (8, 2, 1, 12, null, "Vyrva","Data Devils", null, null, 2),
   (9, 2, 2, 1, null, "Dredd Officer","Data Devils", null, null, 2),
   (10, 2, 0, 0, 3, "Deckard","Data Devils", "Give +3 Health to a unit", 1, 4);
   
insert into deck (deck_id, deck_crd_id, deck_crd_qty) values (1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 2), (1, 5, 2), (2, 6, 1), (2, 7, 2), (2, 8, 3), (2, 9, 2), (2, 10, 2);

insert into game_board (gb_pos) values (1),(2),(3),(4),(5);
insert into game_bench (gben_pos) values (1),(2),(3),(4),(5);

INSERT INTO user VALUES (1,'me','$2b$10$Wemfac2wY/7RSCdKxuYUL.GV2clfhXC66OL76uCpDFUmpYZ/bGZtW','48MnTVJ6sKIvanVHbP5Vx5rysbYrVN4EbYmk4D8xESdfm1hx8jDfNFZGNw9OZs'),(2,'me2','$2b$10$6j2xIDnnxv.TLfBSstbbO.qE7wFTf5envx/uijiFjCP3slsy7EE4K','dQ7NrsbPsuF81xFGNioR1K0tiYkjtxOhemcgMhuFIS68VrFUC9gggm3JCgzkqe');

/* database with data */
INSERT INTO game (gm_turn, gm_state_id) values (1, 2), (1, 2), (1, 2);

INSERT INTO user_game (ug_order, ug_user_id, ug_game_id, ug_state_id, ug_deck_id) values (1, 1, 1, 5, 1), (2, 2, 1, 5, 2),(1, 1, 2, 5, 1), (2, 2, 2, 5, 2),  (1, 1, 3, 5, 1),  (2, 2, 3, 5, 2);

INSERT INTO user_game_card (ugc_user_game_id, ugc_crd_id, ugc_crd_cost, ugc_crd_health, ugc_crd_damage, ugc_crd_bonus, ugc_crd_name, ugc_crd_gang, ugc_crd_info, ugc_crd_hack_type_id, ugc_crd_type_id, crd_state_id) values 
   (1, 1, 0, 25, 5, null, "Cipher","Neon Syndicate", null, null, 1, 1),
   (1, 2, 2, 6, 9, null, "Armitager", "Neon Syndicate", null, null, 3, 4),
   (1, 2, 2, 6, 9, null, "Armitager", "Neon Syndicate", null, null, 3, 1),
   (1, 3, 2, 12, 1, null, "Gunnar","Neon Syndicate", null, null, 2, 4),
   (1, 3, 2, 12, 1, null, "Gunnar","Neon Syndicate", null, null, 2, 3),
   (1, 3, 2, 12, 1, null, "Gunnar","Neon Syndicate", null, null, 2, 1),
   (1, 4, 2, 1, 2, null, "Rezin","Neon Syndicate", null, null, 2, 2),
   (1, 4, 2, 1, 2, null, "Rezin","Neon Syndicate", null, null, 2, 1),
   (1, 5, 2, 0, 0, 3, "Maxine","Neon Syndicate", "Give +3 damage to a unit", 2, 4, 5),
   (1, 5, 2, 0, 0, 3, "Maxine","Neon Syndicate", "Give +3 damage to a unit", 2, 4, 1),

   (2, 6, 5, 25, 5, null, "Makko","Data Devils", null, null, 1, 1),
   (2, 7, 2, 6, 9, null, "Erythrina", "Data Devils", null, null, 3, 1),
   (2, 7, 2, 6, 9, null, "Erythrina", "Data Devils", null, null, 3, 1),
   (2, 8, 2, 12, 1, null, "Vyrva","Data Devils", null, null, 2, 3),
   (2, 8, 2, 12, 1, null, "Vyrva","Data Devils", null, null, 2, 2),
   (2, 8, 2, 12, 1, null, "Vyrva","Data Devils", null, null, 2, 1),
   (2, 9, 2, 1, 2, null, "Dredd Officer","Data Devils", null, null, 2, 5),
   (2, 9, 2, 1, 2, null, "Dredd Officer","Data Devils", null, null, 2, 1),
   (2, 10, 2, 0, 0, 3, "Deckard","Data Devils", "Give +3 Health to a unit", 1, 4, 4),
   (2, 10, 2, 0, 0, 3, "Deckard","Data Devils", "Give +3 Health to a unit", 1, 4, 2); 

  INSERT INTO user_game_board (ugb_ug_id, ugb_crd_id, ugb_pos_id) values (1, 2, 1), (1, 4, 2), (2, 19, 2);

  INSERT INTO user_game_bench (ugben_ug_id, ugben_crd_id, ugben_pos_id) values (1, 5, 1), (2, 14, 2);

  INSERT INTO game (gm_turn, gm_state_id) values (1, 3);

  INSERT INTO scoreboard (sb_user_game_id, sb_state_id) values (1, 3), (2, 2);