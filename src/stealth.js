for(U in g)g[U[0]+[U[7]]+[U[13]]]=g[U];
with(g){
    // createProgramm()
    P=cr();
    // shaderSource(C=createShader(VERTEX_SHADER))
    so(C=ch(VS--),`
        attribute vec4 V;
        attribute vec3 P,R,L;
        varying lowp float C;

        void main(){
          gl_Position=vec4(
            (vec3(V)+mat3(
              mat2(
                cos(V.w),
                -V.w,
                V.w,cos(V.w)
            ))*P).x*${dBH/dBW},
            (vec3(V)+mat3(
              mat2(
                cos(V.w),
                -V.w,
                V.w,
                cos(V.w)))*P).y-.01,
            -.01,
            (vec3(V)+mat3(
              mat2(
                cos(V.w),
                -V.w,
                V.w,
                cos(V.w)))*P).z+.2);
            C=dot(
              normalize(
                mat3(
                  mat2(
                    cos(V.w),
                    -V.w,
                    V.w,
                    cos(V.w)
                  )
                )*cross(P-R,P-L)),
                vec3(.8,.6,.7)
            );
        }
    `);
    // compileShader(C)
    cS(C);
    // attachShader(P,C)
    ah(P,C);
    // initialize plane and missile
    A=B=T=O=0;
    // shaderSource(C=createShader(FRAGMENT_SHADER))
    so(C=ch(VS--),`
        varying lowp float C;

        void main(){
            gl_FragColor=vec4(vec3(C),1);
        }
    `);
    // compileShader(C)
    cS(C);
    // attachShader(P,C)
    ah(P,C);
    // linkProgram(P)
    lg(P);
    // useProgram(P)
    ur(P);
    // bindBuffer(ARRAY_BUFFER, createBuffer())
    bf(AU,cu());
    // bufferData(ARRAY_BUFFER, Float32Array.from(''), STATIC_DRAW)
    // Data structure:
    // |P.x P.y P.x|R.x R.y R.z|L.x L.y L.z|
    // | 4 + 4 + 4 | 4 + 4 + 4 | 4 + 4 + 4 | 36 b
    ba(
        AU,
        Float32Array.from(
           `[O[OOOOO[
            OO[O OO [
            OOO[ OO O
            [ O[O[[ [
            [O[[OOOOO
            OO[OOOO O
            OOO[OO[ O
            [ O[OO[O[
            TOJJOJOOV
            OQRQOQOOJ
            SOHOOJTOJ
            OQROOJMOQ
            KOHJOJOOJ
            POOOPOOOV
            OOVOPONOO
            OPOPOONOO`.replace(
                // Split each face into vertices
                /(...)(...)(...)/g,
                // Transform each face into the pairs of edges 
                // to calculate the normals in the vertex shader.
                `$1$3$2$2$1$3$3$2$1`
            ),
            // Convert each character to the float in a range [-0.5; 0.5]
            U=>(U.charCodeAt()-32)/94-.5
        ),
        SD);
    // enable(DEPTH_TEST)
    e(DE);
    // Enable attributes: (P)oint, (R)ight, (L)eft
    for(U in Q=`PLR`)eet(git(P,Q[U]),vto(git(P,Q[U]),3,F,0,36,U*12));
    // Change flight direction
    onmousemove=U=>T=U.clientX/dBW-.5;
     // Lunch the missile
    onmouseup=U=>{O=1,E=A,f=B};
    // Create the city - random map of heights
    cl(0,0,0,Q=Array.from(Array(16),U=>Array.from(Array(16),Math.random)));
    // Game loop
    setInterval(U=>{
        // clear(COLOR_BUFFER_BIT|DEPTH_BUFFER_BIT)
        clear(16640);
        // Update aircraft position
        A+=.2*T;
        B+=.2;
        // Detect the transition from one cell to another
        I=~~A;
        J=~~B;
        // Update aircraft position in the cell
        A-=I;
        B-=J;
        // Activate missile launcher
        if(O)
            // Update missile position
            E-=I,
            f+=.28-J,
            O-=.01,
            // Check target hit
            Q[8-~~f][7+~~E]>O
                // Mark building as destroyed
                ?Q[8-~~f][7+~~E]=O=0
                // Render the missile
                // vertexAttrib4fv(getAttribLocation(P,`V`), [...])
                :vtf(
                    // getAttribLocation(P,`V`)
                    git(P,`V`),
                    [
                      // x
                        1/8*(E-A),
                        // y
                        O-1,
                        // z
                        1/8*(f-B),
                        // roll angle
                        0
                    ]),
        // drawArrays(TRIANGLES, ...)
        da(4,39,9);
        // Scroll city map
        // Shift the rows
        for(U in Q=Q.splice(-J).concat(Q))
            // Shift the columns
            for(V in Q[U]=Q[U].splice(I).concat(Q[U]))
                // Render building
                // vertexAttrib4fv(getAttribLocation(P,`V`), [...])
                vtf(
                    // getAttribLocation(P,`V`)
                    git(P,`V`),
                    [
                        // x
                        1/8*(V-A)-1,
                        // y
                        Q[U][V]-1,
                        // z
                        1-1/8*(+U+B),
                        // roll angle
                        0
                    ]
                ),
        // drawArrays(TRIANGLES, ...)
        da(4,0,24);
        // Render aircraft
        // vertexAttrib4fv(getAttribLocation(P,`V`), [...])
        vtf(
            // getAttribLocation(P,`V`)
            git(P,`V`),
            [
                // x
                0,
                // y
                0,
                // z
                0,
                // roll angle
                T
            ]),
        // drawArrays(TRIANGLES, ...)
        da(4,24,15);
    },33);
}
