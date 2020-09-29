START=0
END=9
for ((i=START;i<=END;i++)); do
    lsof -i tcp:500$i
done