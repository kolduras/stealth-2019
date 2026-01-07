for(U in g)g[U[0]+[U[7]]+[U[13]]]=g[U];
with(g){
    P=cr();
    so(C=ch(VS--),`
        attribute vec4 V;
        attribute vec3 P,R,L;
        varying lowp float C;

        void main(){
          gl_Position=vec4((vec3(V)+mat3(mat2(cos(V.w),-V.w,V.w,cos(V.w)))*P).x*${dBH/dBW},(vec3(V)+mat3(mat2(cos(V.w),-V.w,V.w,cos(V.w)))*P).y-.01,-.01,(vec3(V)+mat3(mat2(cos(V.w),-V.w,V.w,cos(V.w)))*P).z+.2);
          C=dot(normalize(mat3(mat2(cos(V.w),-V.w,V.w,cos(V.w)))*cross(P-R,P-L)),vec3(.8,.6,.7));
        }
    `),cS(C),ah(P,C);
    A=B=T=O=0;
    so(C=ch(VS--),`
        varying lowp float C;

        void main(){
            gl_FragColor=vec4(vec3(C),1);
        }
    `),cS(C),ah(P,C);
    lg(P);
    ur(P);
    bf(AU,cu());
    ba(AU,Float32Array.from(`[O[OOOOO[OO[O OO [OOO[ OO O[ O[O[[ [[O[[OOOOOOO[OOOO OOOO[OO[ O[ O[OO[O[TOJJOJOOVOQRQOQOOJSOHOOJTOJOQROOJMOQKOHJOJOOJPOOOPOOOVOOVOPONOOOPOPOONOO`.replace(/(...)(...)(...)/g,`$1$3$2$2$1$3$3$2$1`),U=>(U.charCodeAt()-32)/94-.5),SD);
    e(DE);

    for(U in Q=`PLR`)eet(git(P,Q[U]),vto(git(P,Q[U]),3,F,0,36,U*12));

    onmousemove=U=>T=U.clientX/dBW-.5;
    onmouseup=U=>{O=1,E=A,f=B};
    cl(0,0,0,Q=Array.from(Array(16),U=>Array.from(Array(16),Math.random)));
    setInterval(U=>{
        clear(16640);

        A+=.2*T;
        B+=.2;

        I=~~A;
        J=~~B;

        A-=I;
        B-=J;

        if(O)
          E-=I,
              f+=.28-J,
              O-=.01,
              Q[8-~~f][7+~~E]>O
                  ?Q[8-~~f][7+~~E]=O=0
                  :vtf(git(P,`V`),[1/8*(E-A),O-1,1/8*(f-B),0]),
        da(4,39,9);

        for(U in Q=Q.splice(-J).concat(Q))for(V in Q[U]=Q[U].splice(I).concat(Q[U]))
          vtf(git(P,`V`),[1/8*(V-A)-1,Q[U][V]-1,1-1/8*(+U+B),0]),
        da(4,0,24);

        vtf(git(P,`V`),[0,0,0,T]),
        da(4,24,15);
    },33);
}
