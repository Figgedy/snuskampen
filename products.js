// SNUSKAMPEN – produktdata. Redigera fritt.
// id: unikt, används som filnamn för bild (/img/<id>.png) och som nyckel i Supabase.
// dots: styrka 1–6 (retailskalan). mg: visningstext. type: "vit" (nikotinportion) eller "tobak".
// OBS: styrkor/mg är startbedömning – verifiera mot tillverkarens uppgifter.
window.PRODUCTS = [
  // ZYN
  {id:"zyn-citrus-mini-dry", brand:"ZYN", name:"Citrus", format:"Mini Dry", flavor:"Citrus", mg:"6 mg/g", dots:2, type:"vit"},
  {id:"zyn-cool-mint-mini-dry-strong", brand:"ZYN", name:"Cool Mint", format:"Mini Dry Strong", flavor:"Mint", mg:"6 mg/g", dots:3, type:"vit"},
  {id:"zyn-espressino-mini-dry", brand:"ZYN", name:"Espressino", format:"Mini Dry", flavor:"Kaffe & choklad", mg:"6 mg/g", dots:2, type:"vit"},
  {id:"zyn-cool-mint-slim-strong", brand:"ZYN", name:"Cool Mint", format:"Slim Strong", flavor:"Mint", mg:"9,6 mg/g", dots:4, type:"vit"},
  {id:"zyn-cool-mint-slim-xstrong", brand:"ZYN", name:"Cool Mint", format:"Slim X-Strong", flavor:"Mint", mg:"11 mg/g", dots:5, type:"vit"},
  {id:"zyn-citrus-slim-strong", brand:"ZYN", name:"Citrus", format:"Slim Strong", flavor:"Citrus", mg:"9,6 mg/g", dots:4, type:"vit"},
  {id:"zyn-spearmint-slim-strong", brand:"ZYN", name:"Spearmint", format:"Slim Strong", flavor:"Spearmint", mg:"9,6 mg/g", dots:4, type:"vit"},
  {id:"zyn-apple-mint-slim-strong", brand:"ZYN", name:"Apple Mint", format:"Slim Strong", flavor:"Äpple & mint", mg:"9,6 mg/g", dots:4, type:"vit"},
  {id:"zyn-black-cherry-slim-strong", brand:"ZYN", name:"Black Cherry", format:"Slim Strong", flavor:"Körsbär", mg:"9,6 mg/g", dots:4, type:"vit"},
  {id:"zyn-bellini-slim-strong", brand:"ZYN", name:"Bellini", format:"Slim Strong", flavor:"Persika & prosecco", mg:"9,6 mg/g", dots:4, type:"vit"},
  {id:"zyn-espressino-slim-strong", brand:"ZYN", name:"Espressino", format:"Slim Strong", flavor:"Kaffe & choklad", mg:"9,6 mg/g", dots:4, type:"vit"},
  {id:"zyn-deep-freeze-slim-xstrong", brand:"ZYN", name:"Deep Freeze", format:"Slim X-Strong", flavor:"Mentol", mg:"11 mg/g", dots:5, type:"vit"},

  // VELO
  {id:"velo-freeze-xstrong", brand:"VELO", name:"Freeze", format:"Slim X-Strong", flavor:"Mentol & mint", mg:"10,9 mg/g", dots:5, type:"vit"},
  {id:"velo-ice-cool-strong", brand:"VELO", name:"Ice Cool", format:"Slim Strong", flavor:"Mint", mg:"10,9 mg/g", dots:4, type:"vit"},
  {id:"velo-mighty-peppermint", brand:"VELO", name:"Mighty Peppermint", format:"Slim X-Strong", flavor:"Pepparmint", mg:"14 mg/g", dots:5, type:"vit"},
  {id:"velo-crispy-peppermint", brand:"VELO", name:"Crispy Peppermint", format:"Slim", flavor:"Pepparmint", mg:"6 mg/g", dots:2, type:"vit"},
  {id:"velo-ruby-berry", brand:"VELO", name:"Ruby Berry", format:"Slim", flavor:"Bär", mg:"6 mg/g", dots:2, type:"vit"},
  {id:"velo-tropic-breeze", brand:"VELO", name:"Tropic Breeze", format:"Slim", flavor:"Tropisk frukt", mg:"6 mg/g", dots:2, type:"vit"},
  {id:"velo-easy-mint", brand:"VELO", name:"Easy Mint", format:"Mini", flavor:"Mint", mg:"4 mg/g", dots:1, type:"vit"},
  {id:"velo-cool-storm", brand:"VELO", name:"Cool Storm", format:"Slim X-Strong", flavor:"Mint", mg:"10,9 mg/g", dots:5, type:"vit"},
  {id:"velo-royal-cherry", brand:"VELO", name:"Royal Cherry", format:"Slim Strong", flavor:"Körsbär", mg:"10,9 mg/g", dots:4, type:"vit"},
  {id:"velo-elderflower-spritz", brand:"VELO", name:"Elderflower Spritz", format:"Slim", flavor:"Fläder", mg:"6 mg/g", dots:2, type:"vit"},

  // LOOP
  {id:"loop-jalapeno-lime-strong", brand:"LOOP", name:"Jalapeño Lime", format:"Slim Strong", flavor:"Jalapeño & lime", mg:"9,4 mg/g", dots:4, type:"vit"},
  {id:"loop-mint-mania-xstrong", brand:"LOOP", name:"Mint Mania", format:"Slim X-Strong", flavor:"Mint", mg:"15 mg/g", dots:5, type:"vit"},
  {id:"loop-habanero-mint", brand:"LOOP", name:"Habanero Mint", format:"Slim Strong", flavor:"Habanero & mint", mg:"9,4 mg/g", dots:4, type:"vit"},
  {id:"loop-red-chili-melon", brand:"LOOP", name:"Red Chili Melon", format:"Slim Strong", flavor:"Chili & melon", mg:"9,4 mg/g", dots:4, type:"vit"},
  {id:"loop-salty-ludicris", brand:"LOOP", name:"Salty Ludicris", format:"Slim Strong", flavor:"Salt lakrits", mg:"9,4 mg/g", dots:4, type:"vit"},
  {id:"loop-sicilian-spritz", brand:"LOOP", name:"Sicilian Spritz", format:"Slim Strong", flavor:"Apelsin & bitter", mg:"9,4 mg/g", dots:4, type:"vit"},

  // XQS
  {id:"xqs-arctic-freeze", brand:"XQS", name:"Arctic Freeze", format:"Slim X-Strong", flavor:"Mentol", mg:"12 mg/g", dots:5, type:"vit"},
  {id:"xqs-cool-ice", brand:"XQS", name:"Cool Ice", format:"Slim Strong", flavor:"Mint", mg:"8 mg/g", dots:3, type:"vit"},
  {id:"xqs-tropical", brand:"XQS", name:"Tropical", format:"Slim", flavor:"Tropisk frukt", mg:"4 mg/g", dots:2, type:"vit"},
  {id:"xqs-blueberry-mint", brand:"XQS", name:"Blueberry Mint", format:"Slim Strong", flavor:"Blåbär & mint", mg:"8 mg/g", dots:3, type:"vit"},
  {id:"xqs-black-cherry", brand:"XQS", name:"Black Cherry", format:"Slim Strong", flavor:"Körsbär", mg:"8 mg/g", dots:3, type:"vit"},

  // Nordic Spirit
  {id:"nordic-spirit-sweet-mint", brand:"Nordic Spirit", name:"Sweet Mint", format:"Slim", flavor:"Mint", mg:"8,4 mg/p", dots:3, type:"vit"},
  {id:"nordic-spirit-frosty-mint", brand:"Nordic Spirit", name:"Frosty Mint", format:"Slim", flavor:"Pepparmynta & mentol", mg:"10,5 mg/p", dots:4, type:"vit"},
  {id:"nordic-spirit-raspberry", brand:"Nordic Spirit", name:"Raspberry", format:"Slim", flavor:"Hallon", mg:"10,5 mg/p", dots:4, type:"vit"},
  {id:"nordic-spirit-blueberry", brand:"Nordic Spirit", name:"Blueberry", format:"Slim", flavor:"Blåbär", mg:"10,5 mg/p", dots:4, type:"vit"},

  // ACE
  {id:"ace-superwhite-cool-mint", brand:"ACE", name:"Cool Mint", format:"Superwhite", flavor:"Mint", mg:"10 mg/g", dots:4, type:"vit"},
  {id:"ace-superwhite-eucalyptus", brand:"ACE", name:"Eucalyptus", format:"Superwhite", flavor:"Eukalyptus", mg:"10 mg/g", dots:4, type:"vit"},
  {id:"ace-superwhite-green-lemon", brand:"ACE", name:"Green Lemon", format:"Superwhite", flavor:"Citron", mg:"10 mg/g", dots:4, type:"vit"},
  {id:"ace-superwhite-xstrong", brand:"ACE", name:"Cool Mint", format:"Superwhite X-Strong", flavor:"Mint", mg:"16 mg/g", dots:5, type:"vit"},

  // Skruf
  {id:"skruf-super-white-fresh-3", brand:"Skruf", name:"Fresh Mint #3", format:"Super White Slim", flavor:"Mint", mg:"7,5 mg/g", dots:3, type:"vit"},
  {id:"skruf-super-white-fresh-4", brand:"Skruf", name:"Fresh Mint #4", format:"Super White Slim", flavor:"Mint", mg:"11 mg/g", dots:4, type:"vit"},
  {id:"skruf-super-white-polar", brand:"Skruf", name:"Polar Fresh #4", format:"Super White Slim", flavor:"Mentol", mg:"11 mg/g", dots:4, type:"vit"},
  {id:"skruf-super-white-blueberry-rhubarb", brand:"Skruf", name:"Blueberry Rhubarb #2", format:"Super White Slim", flavor:"Blåbär & rabarber", mg:"4 mg/g", dots:2, type:"vit"},

  // Killa / Pablo / White Fox / Siberia (starka)
  {id:"killa-cold-mint", brand:"Killa", name:"Cold Mint", format:"Slim X-Strong", flavor:"Mint", mg:"16 mg/g", dots:5, type:"vit"},
  {id:"killa-mango-ice", brand:"Killa", name:"Mango Ice", format:"Slim X-Strong", flavor:"Mango", mg:"16 mg/g", dots:5, type:"vit"},
  {id:"pablo-ice-cold", brand:"Pablo", name:"Ice Cold", format:"Slim X-Strong", flavor:"Mint", mg:"30 mg/g", dots:6, type:"vit"},
  {id:"white-fox-full-charge", brand:"White Fox", name:"Full Charge", format:"Slim X-Strong", flavor:"Mint", mg:"16,5 mg/g", dots:5, type:"vit"},
  {id:"white-fox-double-mint", brand:"White Fox", name:"Double Mint", format:"Slim X-Strong", flavor:"Mint", mg:"16,5 mg/g", dots:5, type:"vit"},
  {id:"siberia-80-white-dry", brand:"Siberia", name:"-80° White Dry", format:"Slim X-Strong", flavor:"Spearmint", mg:"24 mg/g", dots:6, type:"vit"},
  {id:"volt-frosted-apple", brand:"VOLT", name:"Frosted Apple", format:"Slim Strong", flavor:"Äpple", mg:"10 mg/g", dots:4, type:"vit"},
  {id:"volt-gold-rush", brand:"VOLT", name:"Gold Rush", format:"Slim Strong", flavor:"Passionsfrukt", mg:"10 mg/g", dots:4, type:"vit"},

  // Tobakssnus – Swedish Match
  {id:"general-original-portion", brand:"General", name:"Original", format:"Portion", flavor:"Bergamott", mg:"8,5 mg/g", dots:3, type:"tobak"},
  {id:"general-vit-portion", brand:"General", name:"Original", format:"Vit Portion", flavor:"Bergamott", mg:"8,5 mg/g", dots:3, type:"tobak"},
  {id:"general-mint-vit", brand:"General", name:"Mint", format:"Vit Portion", flavor:"Mint", mg:"8,5 mg/g", dots:3, type:"tobak"},
  {id:"general-g3-slim-extra-strong", brand:"General", name:"G.3", format:"Slim Extra Strong", flavor:"Tobak", mg:"13 mg/g", dots:5, type:"tobak"},
  {id:"general-g4-fuzn", brand:"General", name:"G.4 Fu:zn", format:"Slim Strong", flavor:"Tobak & mint", mg:"12 mg/g", dots:4, type:"tobak"},
  {id:"goteborgs-rape-original", brand:"Göteborgs Rapé", name:"Original", format:"Portion", flavor:"Enbär & örter", mg:"8,5 mg/g", dots:3, type:"tobak"},
  {id:"goteborgs-rape-hjortron", brand:"Göteborgs Rapé", name:"Hjortron", format:"Vit Portion", flavor:"Hjortron", mg:"8,5 mg/g", dots:3, type:"tobak"},
  {id:"ettan-original-portion", brand:"Ettan", name:"Original", format:"Portion", flavor:"Tobak", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"grov-original-portion", brand:"Grov", name:"Original", format:"Portion", flavor:"Tobak", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"grov-vit-portion", brand:"Grov", name:"Original", format:"Vit Portion", flavor:"Tobak", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"kronan-original-portion", brand:"Kronan", name:"Original", format:"Portion", flavor:"Tobak", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"roda-lacket-original", brand:"Röda Lacket", name:"Original", format:"Portion", flavor:"Tobak & lakrits", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"catch-eucalyptus", brand:"Catch", name:"Eucalyptus", format:"Vit Portion", flavor:"Eukalyptus", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"nick-johnny-americana", brand:"Nick & Johnny", name:"Americana", format:"Strong", flavor:"Tobak", mg:"14 mg/g", dots:5, type:"tobak"},

  // Tobakssnus – övriga
  {id:"lundgrens-skane", brand:"Lundgrens", name:"Skåne", format:"Vit Portion", flavor:"Fläder & äpple", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"lundgrens-norrland", brand:"Lundgrens", name:"Norrland", format:"Vit Portion", flavor:"Lingon & enbär", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"knox-original-portion", brand:"Knox", name:"Original", format:"Portion", flavor:"Tobak", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"knox-vit-portion", brand:"Knox", name:"Original", format:"Vit Portion", flavor:"Tobak", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"kaliber-original", brand:"Kaliber", name:"Original", format:"Portion", flavor:"Tobak", mg:"8 mg/g", dots:3, type:"tobak"},
  {id:"kaliber-plus", brand:"Kaliber", name:"+", format:"Vit Portion Strong", flavor:"Tobak", mg:"11 mg/g", dots:4, type:"tobak"},
  {id:"thunder-frosted", brand:"Thunder", name:"Frosted", format:"Portion X-Strong", flavor:"Mint", mg:"16 mg/g", dots:5, type:"tobak"},
  {id:"odens-cold-extreme", brand:"Oden's", name:"Cold Extreme", format:"White Dry", flavor:"Mint", mg:"22 mg/g", dots:6, type:"tobak"},
  {id:"siberia-red-white-dry", brand:"Siberia", name:"-80° Red", format:"White Dry", flavor:"Spearmint", mg:"43 mg/g", dots:6, type:"tobak"},
  {id:"jakobssons-mint", brand:"Jakobsson's", name:"Mint", format:"Portion Strong", flavor:"Mint", mg:"10 mg/g", dots:4, type:"tobak"},
  {id:"jakobssons-melon", brand:"Jakobsson's", name:"Melon", format:"Portion Strong", flavor:"Melon", mg:"10 mg/g", dots:4, type:"tobak"},
];
