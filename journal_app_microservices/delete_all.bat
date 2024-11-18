@echo off
echo Deleting all...

kubectl delete deployments --all
kubectl delete services --all
kubectl delete pods --all

echo All were deleted
